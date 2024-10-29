// Dynamically add user input fields
document.getElementById('add-user-input').addEventListener('click', () => {
    const userInputsDiv = document.getElementById('user-inputs');
    
    // Create a new input element for user addresses
    const input = document.createElement('input');
    input.className = 'dynamic-input input-field'; // Applying styles
    input.placeholder = 'Enter user address';
    
    // Append the new input to the container
    userInputsDiv.appendChild(input);
});

async function addUsers() {
    const userInputs = document.querySelectorAll('.dynamic-input');
    const userAddresses = Array.from(userInputs).map(input => input.value).filter(value => value);

    for (const userAddress of userAddresses) {
        const exists = await contractInstance.methods.userCredit(userAddress).call();
        if (exists === '0') {
            const gasPrice = await web3.eth.getGasPrice();
            const estimatedGas = await contractInstance.methods.addUser(userAddress).estimateGas({ from: currentAccount });

            try {
                const result = await contractInstance.methods.addUser(userAddress).send({ from: currentAccount, gas: estimatedGas, gasPrice: gasPrice });
                alert(`User ${userAddress} added. Transaction hash: ${result.transactionHash}`);
            } catch (error) {
                alert(`Failed to add user ${userAddress}: ${error.message}`);
            }
        } else {
            alert(`User ${userAddress} added successfully.`);
        }
    }
}


async function payUsers() {
    const userInputs = document.querySelectorAll('.dynamic-input');
    const userAddresses = Array.from(userInputs).map(input => input.value).filter(value => value);

    for (const userAddress of userAddresses) {
        const creditInWei = await contractInstance.methods.userCredit(userAddress).call();
        const creditInEth = web3.utils.fromWei(creditInWei, 'ether');

        alert(`Credit for ${userAddress}: ${creditInEth} ETH`);

        const totalAmountInEth = 10 + Number(creditInEth); // 10 ETH + user credit
        const totalAmountInWei = web3.utils.toWei(totalAmountInEth.toString(), 'ether');

        const gasPrice = await web3.eth.getGasPrice();
        const estimatedGas = 21000; // Standard gas limit for transfers

        try {
            const result = await web3.eth.sendTransaction({
                from: currentAccount,
                to: userAddress,
                gas: estimatedGas,
                gasPrice: gasPrice,
                value: totalAmountInWei
            });
            alert(`Paid ${web3.utils.fromWei(totalAmountInWei, 'ether')} ETH to ${userAddress}. Transaction hash: ${result.transactionHash}`);
        } catch (error) {
            alert(`Failed to pay user ${userAddress}: ${error.message}`);
        }
    }
}


document.getElementById('connect').addEventListener('click', init);
document.getElementById('add-users').addEventListener('click', addUsers);
document.getElementById('pay-users').addEventListener('click', payUsers);
