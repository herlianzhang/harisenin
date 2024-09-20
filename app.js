import express from "express";
import {
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    createCourse,
} from "./database.js";

const app = express();
app.use(express.json());

function isFloat(n) {
    return parseFloat(String(n).match(/^-?\d*(\.\d+)?$/)) > 0;
}

app.get("/course", async (req, res) => {
    try {
        const courses = await getCourses();
        res.send(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.get("/course/:id", async (req, res) => {
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

app.put("/course/:id", async (req, res) => {
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
        await updateCourse(id, course);
        res.send(course);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.delete("/course/:id", async (req, res) => {
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

app.post("/course", async (req, res) => {
    try {
        const course = req.body;
        if (course.name === undefined || course.price === undefined) {
            res.status(400).send("Name and price are required");
            return;
        }
        if (!isFloat(course.price)) {
            res.status(400).send("Price must be a float");
            return;
        }
        const params = {
            name: course.name,
            price: course.price,
        };
        await createCourse(params);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
