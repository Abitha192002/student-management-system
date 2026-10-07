Student Management System

A mini full-stack Student Management System built using HTML, CSS, JavaScript, Node.js, and Express.js.

Features

- Student registration and login
- Authentication middleware
- Protected student routes
- Add, view, update, and delete student records
- Filter students by marks
- Filter students by department
- Calculate student grades
- Express application-level and route-level middleware
- Request logging middleware
- Error-handling middleware
- REST API
- Git and GitHub version control

Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Git
- GitHub

Project Structure

Part3-Student Management System/
├── data/
│   ├── student.js
│   └── users.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── logger.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── script.js
│   └── style.css
├── routes/
│   ├── auth.js
│   └── students.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

Installation

1. Clone the repository:

git clone https://github.com/Abitha192002/student-management-system.git

2. Open the project folder:

cd student-management-system

3. Install dependencies:

npm install

Running the Application

Start the server:

node server.js

The application will run at:

http://localhost:3000

Open the registration page:

http://localhost:3000/register.html

Create an account, log in, and access the Student Management System.

API Endpoints

Authentication

- "POST /api/auth/register" — Register a new user
- "POST /api/auth/login" — Login
- "POST /api/auth/logout" — Logout

Students

- "GET /api/students" — Get all students
- "GET /api/students/:id" — Get a student by ID
- "GET /api/students/filter?marks=80" — Filter students by minimum marks
- "GET /api/students/department/:department" — Filter students by department
- "GET /api/students/grades/all" — Get students with calculated grades
- "POST /api/students" — Add a student
- "PUT /api/students/:id" — Update a student
- "DELETE /api/students/:id" — Delete a student

JavaScript Methods Demonstrated

The project demonstrates:

- "map()" for calculating and adding student grades
- "filter()" for filtering students
- "find()" for locating students and users
- "forEach()" for processing student records
- Arrow functions throughout the application

GitHub Repository

https://github.com/Abitha192002/student-management-system

Note

This project is developed as an educational mini full-stack application. Authentication and data storage are implemented for demonstration purposes and are not intended for production use.