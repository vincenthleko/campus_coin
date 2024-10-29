const { userData2 } = require("./uberdata.js");

function calculatePoints2(username) {
    let points = 0;
    userData2.transactions.forEach(transaction => {
        if (transaction.username === username) {
            points += 10;
        }
    });
    return points;
}

module.exports = {calculatePoints2};
