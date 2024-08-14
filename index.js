import express from "express";
import cors from "cors";
import { userData } from "./uberEats/uberEats-brenda/data.js";
import { userData1 } from "./uberEats/uberEats-brian/data.js";
import { userData2 } from "./uberEats/uberEats-richard/data.js";
import { userData3 } from "./uberEats/uberEats-stacy/data.js";
import { calculatePoints } from "./uberEats/uberEats-brenda/expense.js";

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//Brenda's API section
app.get("/api/brenda/points", (req, res) => {
  const points = calculatePoints(userData.transactions);
  res.json({ points: points });
});

//Brian's API section
app.get("/api/brian/points", (req, res) => {
  const points = calculatePoints(userData1.transactions);
  res.json({ points: points });
});

//Richard's API section
app.get("/api/richard/points", (req, res) => {
  const points = calculatePoints(userData2.transactions);
  res.json({ points: points });
});

//Stacy's API section
app.get("/api/stacy/points", (req, res) => {
  const points = calculatePoints(userData3.transactions);
  res.json({ points: points });
});

app.listen(PORT, function () {
  console.log(`Example add listening on port ${PORT}!`);
});
