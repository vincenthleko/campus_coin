

// Function to fetch active loans
async function fetchActiveLoans() {
    try {
        const activeLoans = await contractInstance.methods.getActiveLoans().call();
        if (Array.isArray(activeLoans)) {
            displayLoans(activeLoans);
        } else {
            console.error("Active loans data is not in the expected format.");
        }
    } catch (error) {
        console.error("Error fetching active loans:", error);
    }
}

// Function to display loans on the page
function displayLoans(loans) {
    const loansList = document.getElementById('loans-list');
    loansList.innerHTML = ''; // Clear previous entries

    loans.forEach((loan, index) => {
        const loanElement = document.createElement('div');
        loanElement.classList.add('loan-item');
        loanElement.innerHTML = `
            <p class="ress">Loan ID: ${index + 1}</p>
           <p class="ress">Amount: ${web3.utils.fromWei(loan.amount, 'ether')} ETH</p>

            <p class="ress">Interest Rate: ${loan.interestRate}%</p>
            
           
        `;
        loansList.appendChild(loanElement);
    });
}

async function lendToLoan() {
    const loanId = document.getElementById('loan-id').value;
    const loan = await contractInstance.methods.loans(loanId).call();
    const amountToLend = loan.amount;

    const gasFeePercentage = 2; 
    const expectedAmount = BigInt(amountToLend) + (BigInt(amountToLend) * BigInt(gasFeePercentage)) / BigInt(100);

    const gasPrice = await web3.eth.getGasPrice();
    const estimatedGas = await contractInstance.methods.lend(loanId).estimateGas({ from: currentAccount, value: expectedAmount.toString() });

    try {
        const result = await contractInstance.methods.lend(loanId).send({ from: currentAccount, gas: estimatedGas, gasPrice: gasPrice, value: expectedAmount.toString() });
        alert(`Lent ${web3.utils.fromWei(expectedAmount.toString(), 'ether')} ETH to loan ID ${loanId}. Transaction hash: ${result.transactionHash}`);
    } catch (error) {
        alert(`Failed to lend to loan ID ${loanId}: ${error.message}`);
    }
}

// Event listener for the 'Fetch Available Loans' button
//document.getElementById('fetch-loans').addEventListener('click', fetchActiveLoans);
document.getElementById('lend-to-loan').addEventListener('click', lendToLoan);
