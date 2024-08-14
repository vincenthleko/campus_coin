export function calculatePoints(transactions) {
    let points = 0;
    transactions.forEach(transaction => {
        if (transaction.status === "Completed") {
            points += 10;
        }
    });
    return points;
}