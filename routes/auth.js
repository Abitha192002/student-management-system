const express = require("express");
const router = express.Router();

const users = require("../data/users");


// REGISTER
router.post("/register", (req, res) => {

    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required."
        });
    }

    if (username.length < 3) {
        return res.status(400).json({
            message: "Username must contain at least 3 characters."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must contain at least 6 characters."
        });
    }

    // Check existing user
    const existingUser = users.find(
        user => user.username === username
    );

    if (existingUser) {
        return res.status(409).json({
            message: "Username already exists."
        });
    }

    // Create user
    const newUser = {
        id: users.length + 1,
        username: username,
        password: password
    };

    users.push(newUser);

    res.status(201).json({
        message: "Registration successful."
    });
});


// LOGIN
router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password."
        });
    }

    res.json({
        message: "Login successful.",
        token: "Bearer student-secret-token"
    });
});


// LOGOUT
router.post("/logout", (req, res) => {

    res.json({
        message: "Logout successful."
    });
});


module.exports = router;