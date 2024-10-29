// //const { ethers } = require("ethers");


// const contractAddress = "0xe1ab4a8ad621ca43671b798646fba297ceb5b534";
// const contractABI = [
//     "function addUser(string memory _name, address _walletAdd)",
//     "function sendPayment(address payable recipient) external payable",
//     "function getPrice() public view returns (uint256)",
//     "function getConversionRate(uint256 ethAmount) public view returns (uint256)",
//     "event PaymentSent(address indexed recipient, uint256 amount)"
// ];

// // Infura provider
// const INFURA_ID = '3c63b0011e354e4f8f996debd85fbb2f'
// console.log(ethers)
// //const provider = new ethers.providers.JsonRpcProvider(`https://linea-sepolia.infura.io/v3/${INFURA_ID}`);

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// // step  Create a signer from nsfas acc private key 
// const privateKey = '0x30b6d9026e9db375dfa808af86500f6cff84433298dbde0f355cff3708e17a33'; // NSFAS admin
// const signer = new ethers.Wallet(privateKey, provider);

// // step to Create a contract instance
// const allowancePaymentContract = new ethers.Contract(contractAddress, contractABI, signer);

// // Step to Add a User
// async function addUser(contract, name, walletAddress) {
//     try {
//         const tx = await contract.addUser(name, walletAddress);
//         await tx.wait(); // Wait for transaction to be mined
//         console.log(`User ${name} added successfully!`);
//     } catch (error) {
//         console.error("Error adding user:", error);
//     }
// }

// // Step to Send Payment from admin to students
// async function sendPayment(contract, recipient, amountInEther) {
//     try {
//         const amountInWei = ethers.utils.parseEther(amountInEther);
//         const tx = await contract.sendPayment(recipient, { value: amountInWei });
//         await tx.wait(); // Wait for transaction to be mined
//         console.log(`Payment of ${amountInEther} ETH sent to ${recipient}`);
//     } catch (error) {
//         console.error("Error sending payment:", error);
//     }
// }




// async function sendPayments(){
//     //alert ("Payments have been sent")
//      const users = [
        
//        { name: "Brenda Banker", address: "0x7FE554b51d9F68d03BEDdfD15B2fD4946Ceb2728" },
//        { name: "Stacy Scholar", address: "0xb475217e462e9c4aaD251116E833837858151CA2" },
//        { name: "Richard Rent", address: "0xed1a755B8f046CB0a78B82d4BDFfeF9357F66785" },
//        { name: "Brian Bezos", address: "0x045550aee4bfE0062Ac905ab5b98ab600A3C39E6" },

//      ];

//     // // Loop through users to add them and send payments
//     for (const user of users) {
//        await addUser(allowancePaymentContract, user.name, user.address);
//        await sendPayment(allowancePaymentContract, user.address, "0.005"); // Sending 0.0010 ETH
//     }

// }