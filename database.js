import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getCourses() {
    const [rows] = await pool.query('SELECT * FROM courses')
    return rows
}

async function getCourse(id) {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id])
    return rows
}

async function updateCourse(id, course) {
    await pool.query('UPDATE courses SET ? WHERE id = ?', [course, id])
}

async function deleteCourse(id) {
    await pool.query('DELETE FROM courses WHERE id = ?', [id])
}

async function createCourse(course) {
    await pool.query('INSERT INTO courses SET ?', course)
}

export { getCourses, getCourse, updateCourse, deleteCourse, createCourse }