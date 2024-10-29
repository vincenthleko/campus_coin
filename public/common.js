let web3;
let contractInstance;
let currentAccount;
let contractAddress = '0xe4874E08B2Ef5FE95e09c358DF6ae1AdB87FE016';
let contractAbi;

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
       // const response = await fetch('./build/contracts/PaymentsAndLending.json');
       //// const contractJson = await response.json();
        contractAbi = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amountPaid",
                  "type": "uint256"
                }
              ],
              "name": "FundsDistributed",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "loanId",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "FundsTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "loanId",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "lender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "interestRate",
                  "type": "uint256"
                }
              ],
              "name": "LoanMatched",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "loanId",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "interestRate",
                  "type": "uint256"
                }
              ],
              "name": "LoanRequested",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
                }
              ],
              "name": "UserAdded",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "admin",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "gasFeePercentage",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "loanCount",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "loans",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "interestRate",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "borrower",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "funded",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "totalFunded",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "userCredit",
              "outputs": [
                {
                  "internalType": "int256",
                  "name": "",
                  "type": "int256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "users",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
                }
              ],
              "name": "addUser",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "interestRate",
                  "type": "uint256"
                }
              ],
              "name": "requestLoan",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "loanId",
                  "type": "uint256"
                }
              ],
              "name": "lend",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function",
              "payable": true
            },
            {
              "inputs": [],
              "name": "getActiveLoans",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "uint256",
                      "name": "amount",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "interestRate",
                      "type": "uint256"
                    },
                    {
                      "internalType": "address",
                      "name": "borrower",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "funded",
                      "type": "bool"
                    },
                    {
                      "internalType": "uint256",
                      "name": "totalFunded",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct PaymentsAndLending.Loan[]",
                  "name": "",
                  "type": "tuple[]"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "payUsers",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];
        contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

        currentAccount = (await web3.eth.getAccounts())[0];
        document.getElementById('current-account').innerText = currentAccount;

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            currentAccount = accounts[0];
            document.getElementById('current-account').innerText = currentAccount;
        });

        // Fetch and display active loans on page load
        await fetchActiveLoans();
    } else {
        alert('Please install MetaMask!');
    }
}

async function fetchActiveLoans() {
    try {
        // Call the getActiveLoanDetails function from the smart contract
        const activeLoans = await contractInstance.methods.getActiveLoans().call();
        
        // Destructure the result into separate arrays for ids, amounts, interestRates, and borrowers
        const [loanIds, amounts, interestRates, borrowers] = activeLoans;

        // Get the loans list element in the HTML
        const loansList = document.getElementById('loans-list');
        loansList.innerHTML = ''; // Clear any existing data

        // Iterate over the loans and display each one
        for (let i = 0; i < loanIds.length; i++) {
            const loanItem = document.createElement('div');
            loanItem.className = 'loan-item';
            loanItem.innerHTML = `
                <p>Loan ID: ${loanIds[i]}</p>
                <p>Amount: ${web3.utils.fromWei(amounts[i], 'ether')} ETH</p>
                <p>Interest Rate: ${interestRates[i]}%</p>
                <p>Borrower: ${borrowers[i]}</p>
            `;
            loansList.appendChild(loanItem);
        }
    } catch (error) {
        console.error('Error fetching active loans:', error);
    }
}

// Call init() on page load
document.addEventListener("DOMContentLoaded", init);

