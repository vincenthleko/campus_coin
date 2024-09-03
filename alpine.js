import express from "express";
import cors from "cors";
import  { userData } from "./uberdata.js";
import { calculatePoints } from "./expense.js";

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// let username = userData.transactions;
console.log(userData.transactions[0].username);
app.get(`/api/uber/username/:username`, (req, res) => {
    const points = calculatePoints(req.params.username);
    res.json ({points: points})
})






app.listen(PORT, function () {
  console.log(`Example add listening on port ${PORT}!`);
});
























































