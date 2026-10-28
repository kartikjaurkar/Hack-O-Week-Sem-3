/* =========================================================
   MODULE SECTION
   getStatus and getGrade are exported from studentModule.js
   and imported here.
========================================================= */

import { getStatus, getGrade } from "./studentModule.js";


/* =========================================================
   LET / CONST
========================================================= */

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const error = document.getElementById("error");

let students = [];


/* =========================================================
   ARROW FUNCTION
========================================================= */

const createStudent = (name, course, marks, attendance) => ({
  id: Date.now() + Math.random(),
  name,
  course,
  marks,
  attendance
});


/* =========================================================
   RENDER TABLE
========================================================= */

const renderTable = () => {

  if (students.length === 0) {
    studentTable.innerHTML = "";
    document.getElementById("empty").style.display = "block";
    return;
  }

  document.getElementById("empty").style.display = "none";

  /*
    map()
    Object destructuring:
    {name, course, marks, attendance}
  */

  studentTable.innerHTML = students.map(
    ({id, name, course, marks, attendance}) => {

      const status = getStatus(marks);
      const grade = getGrade(marks);

      /*
        Template literal
        The HTML is dynamically created using backticks.
      */

      return `
        <tr>
          <td><strong>${name}</strong></td>
          <td>${course}</td>
          <td>${marks}</td>
          <td>${attendance}%</td>
          <td class="${status === "Pass" ? "pass" : "fail"}">
            ${status} (${grade})
          </td>
          <td>
            <button class="danger delete-btn" data-id="${id}">
              Delete
            </button>
          </td>
        </tr>
      `;
    }
  ).join("");
};


/* =========================================================
   ARRAY METHODS
========================================================= */

const calculateDashboard = () => {

  if (students.length === 0) {
    document.getElementById("total").textContent = "0";
    document.getElementById("average").textContent = "0";
    document.getElementById("topStudent").textContent = "—";
    document.getElementById("passing").textContent = "0";

    document.getElementById("methodResults").innerHTML =
      "Add a student to see the results.";

    return;
  }

  /*
    map()
    Creates a new array containing only names.
  */
  const names = students.map(student => student.name);

  /*
    filter()
    Finds all students who passed.
  */
  const passedStudents =
    students.filter(student => student.marks >= 40);

  /*
    reduce()
    Adds all marks together.
  */
  const totalMarks =
    students.reduce(
      (sum, student) => sum + student.marks,
      0
    );

  /*
    reduce()
    Calculates average.
  */
  const average =
    totalMarks / students.length;

  /*
    find()
    Finds the first student who scored 80 or more.
  */
  const firstHighScorer =
    students.find(student => student.marks >= 80);

  /*
    some()
    TRUE if at least one student has attendance below 75.
  */
  const hasLowAttendance =
    students.some(student => student.attendance < 75);

  /*
    every()
    TRUE only if every student has attendance >= 75.
  */
  const everyoneHasGoodAttendance =
    students.every(student => student.attendance >= 75);

  /*
    reduce()
    Finds the highest scoring student.
  */
  const topStudent =
    students.reduce(
      (top, student) =>
        student.marks > top.marks ? student : top
    );

  document.getElementById("total").textContent =
    students.length;

  document.getElementById("average").textContent =
    average.toFixed(1);

  document.getElementById("topStudent").textContent =
    topStudent.name;

  document.getElementById("passing").textContent =
    passedStudents.length;


  /*
    Template literals are used again to display results.
  */

  document.getElementById("methodResults").innerHTML = `
    <b>map()</b> → Student names: ${names.join(", ")}<br>
    <b>filter()</b> → Passing students: ${passedStudents.length}<br>
    <b>reduce()</b> → Total marks: ${totalMarks}<br>
    <b>reduce()</b> → Average marks: ${average.toFixed(1)}<br>
    <b>find()</b> → First student with 80+ marks:
      ${firstHighScorer ? firstHighScorer.name : "None"}<br>
    <b>some()</b> → Is anyone below 75% attendance?
      ${hasLowAttendance}<br>
    <b>every()</b> → Does everyone have 75%+ attendance?
      ${everyoneHasGoodAttendance}
  `;
};


/* =========================================================
   FORM EVENT HANDLING
========================================================= */

studentForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const course =
    document.getElementById("course").value;

  const marks =
    Number(document.getElementById("marks").value);

  const attendance =
    Number(document.getElementById("attendance").value);


  if (!name) {
    error.textContent = "Please enter the student name.";
    return;
  }

  if (
    Number.isNaN(marks) ||
    marks < 0 ||
    marks > 100
  ) {
    error.textContent =
      "Marks must be between 0 and 100.";
    return;
  }

  if (
    Number.isNaN(attendance) ||
    attendance < 0 ||
    attendance > 100
  ) {
    error.textContent =
      "Attendance must be between 0 and 100.";
    return;
  }


  /*
    Add object to array using spread.
  */

  const newStudent =
    createStudent(name, course, marks, attendance);

  students = [
    ...students,
    newStudent
  ];

  error.textContent = "";

  studentForm.reset();

  renderTable();
  calculateDashboard();
});


/* =========================================================
   DELETE STUDENT
========================================================= */

studentTable.addEventListener("click", (event) => {

  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const id =
    Number(event.target.dataset.id);

  students =
    students.filter(student => student.id !== id);

  renderTable();
  calculateDashboard();
});


/* =========================================================
   SAMPLE DATA
========================================================= */

document.getElementById("sampleButton")
.addEventListener("click", () => {

  const sampleStudents = [
    createStudent("Aarav", "B.Tech CSE", 86, 92),
    createStudent("Ira", "B.Tech CSE", 91, 88),
    createStudent("Riya", "B.Tech IT", 74, 81),
    createStudent("Kabir", "B.Tech AI", 62, 76),
    createStudent("Ananya", "B.Tech CSE", 38, 69)
  ];

  /*
    Spread operator combines the old and new arrays.
  */

  students = [
    ...students,
    ...sampleStudents
  ];

  renderTable();
  calculateDashboard();
});


/* =========================================================
   CLEAR DATA
========================================================= */

document.getElementById("clearButton")
.addEventListener("click", () => {

  students = [];

  renderTable();
  calculateDashboard();
});


/* =========================================================
   REST PARAMETER
========================================================= */

const calculateTotal = (...marks) => {
  return marks.reduce(
    (sum, mark) => sum + mark,
    0
  );
};


/* Example use of rest */
const demonstrationTotal =
  calculateTotal(80, 90, 75);


/* =========================================================
   CODE DISPLAY SECTION
========================================================= */

const codeExamples = {

variables: `// let and const

const college = "SIT Nagpur";

let studentCount = 0;

studentCount = studentCount + 1;

console.log(college);
console.log(studentCount);`,

arrow: `// Arrow function

const getStatus = (marks) => {
  return marks >= 40 ? "Pass" : "Fail";
};

// Short form

const double = number => number * 2;`,

template: `// Template literal

const name = "Ira";
const marks = 91;

const message =
  \`Student \${name} scored \${marks} marks.\`;

console.log(message);`,

destructure: `// Object destructuring

const student = {
  name: "Ira",
  marks: 91,
  attendance: 88
};

const { name, marks, attendance } = student;


// Array destructuring

const numbers = [10, 20, 30];

const [first, second] = numbers;`,

spread: `// Spread operator

const students = ["Ira", "Riya"];

const newStudents = [
  ...students,
  "Aarav"
];


// Object spread

const student = {
  name: "Ira",
  marks: 91
};

const updatedStudent = {
  ...student,
  attendance: 88
};


// Rest parameter

const calculateTotal = (...marks) =>
  marks.reduce((sum, mark) => sum + mark, 0);`,

modules: `// Exported module

export const getStatus = (marks) =>
  marks >= 40 ? "Pass" : "Fail";


// Importing the module

import {
  getStatus
} from "./studentModule.js";

console.log(getStatus(85));`,

methods: `// map()
students.map(student => student.name);

// filter()
students.filter(student => student.marks >= 40);

// reduce()
students.reduce(
  (sum, student) => sum + student.marks,
  0
);

// find()
students.find(student => student.marks >= 80);

// some()
students.some(
  student => student.attendance < 75
);

// every()
students.every(
  student => student.attendance >= 75
);`
};


document.querySelectorAll(".code-tabs button")
.forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".code-tabs button")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    document.getElementById("codeBox").textContent =
      codeExamples[button.dataset.code];
  });

});


/* Show first code example initially */
document.getElementById("codeBox").textContent =
  codeExamples.variables;


/* Initial render */
renderTable();
calculateDashboard();
