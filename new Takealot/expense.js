const { userData1 } = require("./takealotdata.js");

function calculatePoints1(username) {
    let points = 0;
    userData1.transactions.forEach(transaction => {
        if (transaction.username === username) {
            points += 10;
        }
    });
    return points;
}

module.exports = {calculatePoints1};
