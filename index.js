const express = require("express");
const cors = require("cors");
const { userData } = require("./new Checkers60/checkers60data.js");
const { userData1 } = require("./new Takealot/takealotdata.js");
const { userData2 } = require("./new Uber/uberdata.js");
const { userData3 } = require("./new UberEats/uberEatsdata.js");
const { calculatePoints } = require("./new Checkers60/expense.js");
const { calculatePoints1 } = require("./new Takealot/expense.js");
const { calculatePoints2 } = require("./new Uber/expense.js");
const { calculatePoints3 } = require("./new UberEats/expense.js");

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

console.log(userData.transactions[0].username);
app.get(`/api/checkers60/username/:username`, (req, res) => {
    const points = calculatePoints(req.params.username);
    res.json({ points: points });
});

console.log(userData1.transactions[0].username);
app.get(`/api/takealot/username/:username`, (req, res) => {
    const points = calculatePoints1(req.params.username);
    res.json({ points: points });
});

console.log(userData2.transactions[0].username);
app.get(`/api/uber/username/:username`, (req, res) => {
    const points = calculatePoints2(req.params.username);
    res.json({ points: points });
});

console.log(userData3.transactions[0].username);
app.get(`/api/uberEats/username/:username`, (req, res) => {
    const points = calculatePoints3(req.params.username);
    res.json({ points: points });
});

// Simple in-memory "database" for demonstration
let users = [];

app.post('/api/register', (req, res) => {
    const { studentNumber, password } = req.body;

    // Check if the student number is already registered
    if (users.find(user => user.studentNumber === studentNumber)) {
        return res.json({ success: false, message: "Student number already registered." });
    }

    // Register the new user
    users.push({ studentNumber, password });
    res.json({ success: true, message: "Registration successful!" });
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
