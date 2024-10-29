const PaymentsAndLending = artifacts.require("PaymentsAndLending");

module.exports = function (deployer) {
  deployer.deploy(PaymentsAndLending);
};
