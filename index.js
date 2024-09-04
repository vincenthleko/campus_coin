import express from "express";
import cors from "cors";
import  { userData } from "./new Checkers60/checkers60data.js";
import  { userData1 } from "./new Takealot/takealotdata.js";
import  { userData2 } from "./new Uber/uberdata.js";
import  { userData3 } from "./new UberEats/uberEatsdata.js";
import { calculatePoints } from "./new Checkers60/expense.js";
import { calculatePoints1 } from "./new Takealot/expense.js";
import { calculatePoints2 } from "./new Uber/expense.js";
import { calculatePoints3 } from "./new UberEats/expense.js";

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// let username = userData.transactions;
console.log(userData.transactions[0].username);
app.get(`/api/checkers60/username/:username`, (req, res) => {
    const points = calculatePoints(req.params.username);
    res.json ({points: points})
})

console.log(userData1.transactions[0].username);
app.get(`/api/takealot/username/:username`, (req, res) => {
    const points = calculatePoints1(req.params.username);
    res.json ({points: points})
})

console.log(userData2.transactions[0].username);
app.get(`/api/uber/username/:username`, (req, res) => {
    const points = calculatePoints2(req.params.username);
    res.json ({points: points})
})

console.log(userData3.transactions[0].username);
app.get(`/api/uberEats/username/:username`, (req, res) => {
    const points = calculatePoints3(req.params.username);
    res.json ({points: points})
})



app.listen(PORT, function () {
  console.log(`Example add listening on port ${PORT}!`);
});