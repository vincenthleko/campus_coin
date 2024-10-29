// borrower.js
async function requestLoan() {
    const amount = document.getElementById('loan-amount').value;
    const interestRate = document.getElementById('interest-rate').value;

    const gasPrice = await web3.eth.getGasPrice();
    const estimatedGas = await contractInstance.methods.requestLoan(web3.utils.toWei(amount, 'ether'), interestRate).estimateGas({ from: currentAccount });

    try {
        const result = await contractInstance.methods.requestLoan(web3.utils.toWei(amount, 'ether'), interestRate).send({ from: currentAccount, gas: estimatedGas, gasPrice: gasPrice });
        alert(`Loan requested for ${amount} ETH at ${interestRate}% interest. Transaction hash: ${result.transactionHash}`);
    } catch (error) {
        alert(`Failed to request loan: ${error.message}`);
    }
}

document.getElementById('connect').addEventListener('click', init);
document.getElementById('request-loan').addEventListener('click', requestLoan);
