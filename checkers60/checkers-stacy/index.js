import express from 'express';
import cors from 'cors';
import { userData } from './data.js';
import { calculatePoints } from './expense.js';

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Endpoint to get points for completed transactions
app.get('/api/points', (req, res) => {
    const points = calculatePoints(userData.transactions);
    res.json({ points: points });
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

// app.listen(3006, function () {
//     console.log('Example app listening on port 3006!');
