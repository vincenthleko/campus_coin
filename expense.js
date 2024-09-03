import { userData } from "./uberdata.js";

export function calculatePoints(username) {
    let points = 0;
    userData.transactions.forEach(transaction => {
        if (transaction.username === username) {

            points += 10;
        }
    });
    return points;
}