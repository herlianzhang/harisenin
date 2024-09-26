import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

async function getCourses({ topic, sortBy, search }) {
    let query = "SELECT * FROM courses WHERE 1=1";
    const params = [];

    if (topic) {
        query += " AND topic = ?";
        params.push(topic);
    }

    if (search) {
        query += " AND (name LIKE ? OR topic LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }

    if (sortBy) {
        query += ` ORDER BY ${sortBy}`;
    }

    const [rows] = await pool.query(query, params);
    return rows;
}

async function getCourse(id) {
    const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
    return rows;
}

async function updateCourse(id, course) {
    await pool.query("UPDATE courses SET ? WHERE id = ?", [course, id]);
}

async function deleteCourse(id) {
    await pool.query("DELETE FROM courses WHERE id = ?", [id]);
}

async function createCourse(course) {
    await pool.query("INSERT INTO courses SET ?", course);
}

async function checkIsUniqueUser(email, username) {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username]
    );
    return rows.length === 0;
}

async function createUser(
    fullname,
    username,
    hashedPassword,
    email,
    tokenVerification
) {
    const [result] = await pool.query("INSERT INTO users SET ?", {
        full_name: fullname,
        username: username,
        hashed_password: hashedPassword,
        email: email,
        token_verification: tokenVerification,
    });

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        result.insertId,
    ]);
    return rows[0];
}

async function getUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
    ]);
    return rows;
}

async function getUserByToken(token) {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE token_verification = ?",
        [token]
    );
    return rows;
}

async function updateUser(id, user) {
    await pool.query("UPDATE users SET ? WHERE id = ?", [user, id]);
}

export {
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
};
