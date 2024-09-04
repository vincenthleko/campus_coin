import { userData3 } from "./uberEatsdata.js";

export function calculatePoints3(username) {
    let points = 0;
    userData3.transactions.forEach(transaction => {
        if (transaction.username === username) {

            points += 10;
        }
    });
    return points;
}