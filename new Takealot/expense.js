import { userData1 } from "./takealotdata.js";

export function calculatePoints1(username) {
    let points = 0;
    userData1.transactions.forEach(transaction => {
        if (transaction.username === username) {

            points += 10;
        }
    });
    return points;
}