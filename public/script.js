const token = localStorage.getItem("token");


// CHECK AUTHENTICATION

if (!token) {
    window.location.href = "login.html";
}


// DISPLAY MESSAGE

function showMessage(message) {

    document.getElementById("message").textContent =
        message;

}


// LOAD ALL STUDENTS

async function loadStudents() {

    const response = await fetch(
        "/api/students",
        {
            headers: {
                "Authorization": token
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        showMessage(data.message);

        return;
    }


    displayStudents(data);

}


// DISPLAY STUDENTS USING map()

function displayStudents(students) {

    const studentList =
        document.getElementById("studentList");


    studentList.innerHTML = students
        .map(student => {

            return `
                <div class="student">

                    <h3>${student.name}</h3>

                    <p>
                        Age: ${student.age}
                    </p>

                    <p>
                        Department: ${student.department}
                    </p>

                    <p>
                        Marks: ${student.marks}
                    </p>

                    ${
                        student.grade
                            ? `<p>Grade: ${student.grade}</p>`
                            : ""
                    }

                    <button
                        onclick="deleteStudent(${student.id})"
                    >
                        Delete
                    </button>

                </div>
            `;

        })
        .join("");

}


// ADD STUDENT

document
    .getElementById("studentForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();


        const student = {

            name:
                document.getElementById("name").value,

            age:
                Number(
                    document.getElementById("age").value
                ),

            department:
                document.getElementById("department").value,

            marks:
                Number(
                    document.getElementById("marks").value
                )

        };


        const response = await fetch(
            "/api/students",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },

                body: JSON.stringify(student)
            }
        );


        const data = await response.json();


        showMessage(data.message);


        if (response.ok) {

            document
                .getElementById("studentForm")
                .reset();

            loadStudents();

        }

    });


// SHOW GRADES

async function loadGrades() {

    const response = await fetch(
        "/api/students/grades/all",
        {
            headers: {
                "Authorization": token
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        showMessage(data.message);

        return;
    }


    displayStudents(data);

}


// FILTER BY MARKS

async function filterByMarks() {

    const marks =
        document.getElementById("minimumMarks").value;


    const response = await fetch(
        `/api/students/filter?marks=${marks}`,
        {
            headers: {
                "Authorization": token
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        showMessage(data.message);

        return;
    }


    displayStudents(data);

}


// FILTER BY DEPARTMENT

async function filterByDepartment() {

    const department =
        document.getElementById("departmentFilter").value;


    const response = await fetch(
        `/api/students/department/${department}`,
        {
            headers: {
                "Authorization": token
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        showMessage(data.message);

        return;
    }


    displayStudents(data);

}


// DELETE STUDENT

async function deleteStudent(id) {

    const response = await fetch(
        `/api/students/${id}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": token
            }
        }
    );


    const data = await response.json();


    showMessage(data.message);


    loadStudents();

}


// LOGOUT

async function logout() {

    await fetch(
        "/api/auth/logout",
        {
            method: "POST"
        }
    );


    localStorage.removeItem("token");


    window.location.href = "login.html";

}


// LOAD STUDENTS WHEN PAGE OPENS

loadStudents();