import express from "express";
import cors from "cors";
import { userData } from "./uberEats/uberEats-brenda/data.js";
import { userData1 } from "./uberEats/uberEats-brian/data.js";
import { userData2 } from "./uberEats/uberEats-richard/data.js";
import { userData3 } from "./uberEats/uberEats-stacy/data.js";
import { userData4 } from "./uber/uber-brenda/data.js";
import { userData5 } from "./uber/uber-brian/data.js";
import { userData6 } from "./uber/uber-richard/data.js";
import { userData7 } from "./uber/uber-stacy/data.js";
import { userData8 } from "./takealot/takealot-brenda/data.js";
import { userData9 } from "./takealot/takealot-brian/data.js";
import { userData10 } from "./takealot/takealot-richard/data.js";
import { userData11 } from "./takealot/takealot-stacy/data.js";
import { userData12 } from "./checkers60/checkers-brenda/data.js";
import { userData13 } from "./checkers60/checkers-brian/data.js";
import { userData14 } from "./checkers60/checkers-richard/data.js";
import { userData15 } from "./checkers60/checkers-stacy/data.js";
import { calculatePoints } from "./uberEats/uberEats-brenda/expense.js";

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//Brenda's uberEats API section
app.get(`/api/brenda/uberEats/points`, (req, res) => {
  const points = calculatePoints(userData.transactions);
  res.json({ points: points });
});

//Brian's uberEats API section
app.get(`/api/brian/uberEats/points`, (req, res) => {
  const points = calculatePoints(userData1.transactions);
  res.json({ points: points });
});

//Richard's uberEats API section
app.get(`/api/richard/uberEats/points`, (req, res) => {
  const points = calculatePoints(userData2.transactions);
  res.json({ points: points });
});

//Stacy's uberEats API section
app.get(`/api/stacy/uberEats/points`, (req, res) => {
  const points = calculatePoints(userData3.transactions);
  res.json({ points: points });
});

//brenda's uber API section
app.get(`/api/brenda/uber/points`, (req, res) => {
  const points = calculatePoints(userData4.transactions);
  res.json({ points: points });
});

//brian's uber API section
app.get(`/api/brain/uber/points`, (req, res) => {
  const points = calculatePoints(userData5.transactions);
  res.json({ points: points });
});

//richard's uber API section
app.get(`/api/richard/uber/points`, (req, res) => {
  const points = calculatePoints(userData6.transactions);
  res.json({ points: points });
});

//stacy's uber API section
app.get(`/api/stacy/uber/points`, (req, res) => {
  const points = calculatePoints(userData7.transactions);
  res.json({ points: points });
});

//brenda's checkers60 API section
app.get(`/api/brenda/checkers60/points`, (req, res) => {
  const points = calculatePoints(userData12.transactions);
  res.json({ points: points });
});

//brain's checkers60 API section
app.get(`/api/brian/checkers60/points`, (req, res) => {
  const points = calculatePoints(userData13.transactions);
  res.json({ points: points });
});

//richard's checkers60 API section
app.get(`/api/richard/checkers60/points`, (req, res) => {
  const points = calculatePoints(userData14.transactions);
  res.json({ points: points });
});

//stacy's checkers60 API section
app.get(`/api/stacy/checkers60/points`, (req, res) => {
  const points = calculatePoints(userData15.transactions);
  res.json({ points: points });
});

//brenda's takealot API section
app.get(`/api/brenda/takealot/points`, (req, res) => {
  const points = calculatePoints(userData8.transactions);
  res.json({ points: points });
});

//brian's takealot API section
app.get(`/api/brian/takealot/points`, (req, res) => {
  const points = calculatePoints(userData9.transactions);
  res.json({ points: points });
});

//richard's takealot API section
app.get(`/api/richard/takealot/points`, (req, res) => {
  const points = calculatePoints(userData10.transactions);
  res.json({ points: points });
});

//stacy's takealot API section
app.get(`/api/stacy/takealot/points`, (req, res) => {
  const points = calculatePoints(userData11.transactions);
  res.json({ points: points });
});

app.listen(PORT, function () {
  console.log(`Example add listening on port ${PORT}!`);
});
