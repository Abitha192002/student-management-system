const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

const app = express();

const PORT = 3000;


// APPLICATION-LEVEL MIDDLEWARE
app.use(express.json());

app.use(logger);


// SERVE FRONTEND FILES
app.use(express.static(path.join(__dirname, "public")));


// HOME API ROUTE
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to Student Management System API"
    });
});


// AUTHENTICATION ROUTES
app.use("/api/auth", authRoutes);


// STUDENT ROUTES
app.use("/api/students", studentRoutes);


// 404 ERROR MIDDLEWARE
app.use((req, res, next) => {

    res.status(404).json({
        message: "Route not found."
    });

});


// ERROR-HANDLING MIDDLEWARE
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});