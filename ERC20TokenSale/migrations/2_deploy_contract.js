const PtnCoinToken = artifacts.require("PtnCoinToken");
const PtnCoinTokenSale = artifacts.require('PtnCoinTokenSale');

module.exports = function (deployer) {
  // Token
  decimalPlaces = 18;
  initialSupply = 1000 * (10 ** decimalPlaces);

  // Sale token
  tokenPrice = 1 * (10 ** 15); // 0.001ETH

  deployer.deploy(PtnCoinToken, BigInt(initialSupply), decimalPlaces).then(() => {
    return deployer.deploy(PtnCoinTokenSale, PtnCoinToken.address, tokenPrice);
  });
};
