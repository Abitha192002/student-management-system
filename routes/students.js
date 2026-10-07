const express = require("express");
const router = express.Router();

const students = require("../data/student");
const authMiddleware = require("../middleware/auth");


// ROUTE-LEVEL MIDDLEWARE
router.use((req, res, next) => {

    console.log("Student route middleware executed.");

    next();
});


// GET ALL STUDENTS
router.get("/", authMiddleware, (req, res) => {

    students.forEach(student => {
        console.log(`Student: ${student.name}`);
    });

    res.json(students);
});


// FILTER BY MARKS
router.get("/filter", authMiddleware, (req, res) => {

    const minimumMarks = Number(req.query.marks) || 80;

    const filteredStudents = students.filter(
        student => student.marks >= minimumMarks
    );

    res.json(filteredStudents);
});


// FILTER BY DEPARTMENT
router.get("/department/:department", authMiddleware, (req, res) => {

    const department = req.params.department;

    const filteredStudents = students.filter(
        student =>
            student.department.toLowerCase() ===
            department.toLowerCase()
    );

    res.json(filteredStudents);
});


// MAP - CALCULATE GRADE
router.get("/grades/all", authMiddleware, (req, res) => {

    const studentsWithGrades = students.map(student => {

        let grade;

        if (student.marks >= 90) {
            grade = "A+";
        } else if (student.marks >= 80) {
            grade = "A";
        } else if (student.marks >= 70) {
            grade = "B";
        } else {
            grade = "C";
        }

        return {
            ...student,
            grade: grade
        };
    });

    res.json(studentsWithGrades);
});


// FIND STUDENT BY ID
router.get("/:id", authMiddleware, (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.json(student);
});


// CREATE STUDENT
router.post("/", authMiddleware, (req, res) => {

    const {
        name,
        age,
        department,
        marks
    } = req.body;

    // Validation
    if (!name || !age || !department || marks === undefined) {
        return res.status(400).json({
            message: "All student fields are required."
        });
    }

    if (marks < 0 || marks > 100) {
        return res.status(400).json({
            message: "Marks must be between 0 and 100."
        });
    }

    const newStudent = {

        id: students.length
            ? Math.max(
                ...students.map(student => student.id)
            ) + 1
            : 1,

        name: name,
        age: Number(age),
        department: department,
        marks: Number(marks)
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully.",
        student: newStudent
    });
});


// UPDATE STUDENT
router.put("/:id", authMiddleware, (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    const {
        name,
        age,
        department,
        marks
    } = req.body;

    if (name) {
        student.name = name;
    }

    if (age) {
        student.age = Number(age);
    }

    if (department) {
        student.department = department;
    }

    if (marks !== undefined) {
        if (marks < 0 || marks > 100) {
            return res.status(400).json({
                message: "Marks must be between 0 and 100."
            });
        }

        student.marks = Number(marks);
    }

    res.json({
        message: "Student updated successfully.",
        student: student
    });
});


// DELETE STUDENT
router.delete("/:id", authMiddleware, (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully.",
        student: deletedStudent[0]
    });
});


module.exports = router;