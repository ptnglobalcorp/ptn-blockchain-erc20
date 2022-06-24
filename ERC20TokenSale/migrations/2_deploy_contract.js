const CepToken = artifacts.require("CepToken");
const CepTokenSale = artifacts.require('CepTokenSale');

module.exports = function (deployer) {
  // Token
  decimalPlaces = 18;
  initialSupply = 1000 * (10 ** decimalPlaces);

  // Sale token
  tokenPrice = 1 * (10 ** 15); // 0.001ETH

  deployer.deploy(CepToken, BigInt(initialSupply), decimalPlaces).then(() => {
    return deployer.deploy(CepTokenSale, CepToken.address, tokenPrice);
  });
};
