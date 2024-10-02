const Web3 = require("web3");
const INFURA_ID = '3c63b0011e354e4f8f996debd85fbb2f'
async function connect() {
    const provider = new Web3.providers.JsonRpcProvider(`https://linea-sepolia.infura.io/v3/${INFURA_ID}`);
    const web3 = new Web3(provider);
    console.log(web3);
}
connect();