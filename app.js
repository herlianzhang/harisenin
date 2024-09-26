import express from "express";
import multer from "multer";
import {
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    createCourse,
    checkIsUniqueUser,
    createUser,
    getUserByEmail,
    getUserByToken,
    updateUser,
} from "./database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SECRET_KEY = process.env.SECRET_KEY;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

function isFloat(n) {
    return parseFloat(String(n).match(/^-?\d*(\.\d+)?$/)) > 0;
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        SECRET_KEY,
        { expiresIn: "24h" }
    );
}

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).send("A token is required for authentication");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).send("Invalid Token");
    }
    return next();
}

function sendVerificationEmail(email, tokenVerification) {
    const verificationUrl = `http://localhost:8080/verify-email?token=${tokenVerification}`;
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            throw new Error("Error sending verification email");
        }
        console.log("Email sent:", info.response);
    });
}

app.get("/course", verifyToken, async (req, res) => {
    try {
        const { topic, sortBy, search } = req.query;
        const courses = await getCourses({ topic, sortBy, search });
        res.send(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.get("/course/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const course = await getCourse(id);
        if (course.length === 0) {
            res.status(404).send("Course not found");
            return;
        }
        res.send(course[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.put("/course/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const courses = await getCourse(id);
        if (courses.length === 0) {
            res.status(404).send("Course not found");
            return;
        }
        const course = courses[0];
        const body = req.body;
        console.log(body);
        if (body.name !== undefined) {
            course.name = body.name;
        }
        if (body.price !== undefined) {
            if (!isFloat(body.price)) {
                res.status(400).send("Price must be a float");
                return;
            }
            course.price = body.price;
        }
        if (body.topic !== undefined) {
            course.topic = body.topic;
        }
        await updateCourse(id, course);
        res.send(course);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.delete("/course/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const courses = await getCourse(id);
        if (courses.length === 0) {
            res.status(404).send("Course not found");
            return;
        }
        await deleteCourse(id);
        res.send("Course deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.post("/course", verifyToken, async (req, res) => {
    try {
        const course = req.body;
        if (
            course.name === undefined ||
            course.price === undefined ||
            course.topic === undefined ||
            course.name === "" ||
            course.price === "" ||
            course.topic === ""
        ) {
            res.status(400).send("Name, price and topic are required");
            return;
        }
        if (!isFloat(course.price)) {
            res.status(400).send("Price must be a float");
            return;
        }
        const params = {
            name: course.name,
            price: course.price,
            topic: course.topic,
        };
        await createCourse(params);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.post("/register", async (req, res) => {
    try {
        const username = req.body.username;
        const fullname = req.body.fullname;
        const password = req.body.password;
        const email = req.body.email;
        if (
            username === undefined ||
            fullname === undefined ||
            password === undefined ||
            email === undefined ||
            username === "" ||
            fullname === "" ||
            password === "" ||
            email === ""
        ) {
            res.status(400).send(
                "Username, fullname, password and email are required"
            );
            return;
        }
        if (!validateEmail(email)) {
            res.status(400).send("Invalid email address");
            return;
        }

        const isUnique = await checkIsUniqueUser(email, username);

        if (!isUnique) {
            res.status(400).send("Email or username is already taken");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const tokenVerification = uuidv4();
        const user = await createUser(
            fullname,
            username,
            hashedPassword,
            email,
            tokenVerification
        );

        // Send verification email
        sendVerificationEmail(email, tokenVerification);

        const token = generateToken(user);
        res.status(201).send({ accessToken: token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email === undefined || password === undefined) {
            res.status(400).send("Username and password are required");
            return;
        }
        if (!validateEmail(email)) {
            res.status(400).send("Invalid email address");
            return;
        }

        const users = await getUserByEmail(email);

        if (users.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(
            password,
            user.hashed_password
        );
        if (!isPasswordValid) {
            res.status(401).send("Invalid password");
            return;
        }

        const token = generateToken(user);

        res.status(200).send({ accessToken: token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.get("/verify-email", async (req, res) => {
    try {
        const token = req.query.token;
        if (token === undefined) {
            res.status(400).send("Token is required");
            return;
        }
        const users = await getUserByToken(token);
        if (users.length === 0) {
            res.status(404).send("Invalid Verification");
            return;
        }
        const user = users[0];
        await updateUser(user.id, {
            token_verification: null,
            is_verified: true,
        });
        res.status(200).send("Email Verified Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.post("/upload", upload.single("file"), (req, res) => {
    try {
        res.status(200).send({
            message: "Image uploaded successfully",
            file: req.file,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
