const { userData } = require("./checkers60data.js");

function calculatePoints(username) {
    let points = 0;
    userData.transactions.forEach(transaction => {
        if (transaction.username === username) {
            points += 10;
        }
    });
    return points;
}

module.exports = {calculatePoints};
