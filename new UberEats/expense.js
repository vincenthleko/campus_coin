const { userData3 } = require("./uberEatsdata.js");

function calculatePoints3(username) {
    let points = 0;
    userData3.transactions.forEach(transaction => {
        if (transaction.username === username) {
            points += 10;
        }
    });
    return points;
}

module.exports = {calculatePoints3};
