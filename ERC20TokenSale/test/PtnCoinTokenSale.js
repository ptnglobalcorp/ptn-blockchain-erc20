const ptnCoinToken = artifacts.require('PtnCoinToken');
const ptnCointTokenSale = artifacts.require('PtnCoinTokenSale');

contract('DappTokenSale', function (accounts) {
    var tokenInstance;
    var tokenSaleInstance;
    var decimalPlaces = 18;
    var admin = accounts[0];
    var buyer = accounts[1];
    var tokenPrice = 1 * (10 ** 15); // in wei
    var tokensAvailable = 500 * (10 ** decimalPlaces);
    var numberOfTokens;

    it('1. initializes', function () {
        return ptnCointTokenSale.deployed().then(function (instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function (address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.cepTokenContract();
        }).then(function (address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function (price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });

    it('2. buying', function () {
        return ptnCoinToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return ptnCointTokenSale.deployed();
        }).then(function (instance) {
            tokenSaleInstance = instance;
            // Provision 50%
            return tokenInstance.transfer(tokenSaleInstance.address, BigInt(tokensAvailable), { from: admin })
        })
            .then(function (receipt) {
                numberOfTokens = 100 * (10 ** decimalPlaces);
                return tokenSaleInstance.buyTokens(BigInt(numberOfTokens), { from: buyer, value: numberOfTokens / (10 ** 18) * tokenPrice })
            })
            .then(function (receipt) {
                assert.equal(receipt.logs.length, 1, 'triggers one event');
                assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
                assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
                assert.equal(receipt.logs[0].args._amount, BigInt(numberOfTokens), 'logs the number of tokens purchased');
                return tokenSaleInstance.tokensSold();
            })
            .then(function (amount) {
                assert.equal(amount, numberOfTokens, 'tokens sold');
                return tokenInstance.balanceOf(buyer);
            })
            // .then(function (balance) {
            //     assert.equal(balance.toNumber(), numberOfTokens);
            //     return tokenInstance.balanceOf(tokenSaleInstance.address);
            // }).then(function (balance) {
            //     assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
            //     // Try to buy tokens different from the ether value
            //     return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
            // }).then(assert.fail).catch(function (error) {
            //     assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
            //     return tokenSaleInstance.buyTokens(800 * (10 ** decimalPlaces), { from: buyer, value: numberOfTokens * tokenPrice })
            // }).then(assert.fail).catch(function (error) {
            //     assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
            // })
            ;
    });

    // it('ends token sale', function() {
    //   return DappToken.deployed().then(function(instance) {
    //     // Grab token instance first
    //     tokenInstance = instance;
    //     return DappTokenSale.deployed();
    //   }).then(function(instance) {
    //     // Then grab token sale instance
    //     tokenSaleInstance = instance;
    //     // Try to end sale from account other than the admin
    //     return tokenSaleInstance.endSale({ from: buyer });
    //   }).then(assert.fail).catch(function(error) {
    //     assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
    //     // End sale as admin
    //     return tokenSaleInstance.endSale({ from: admin });
    //   }).then(function(receipt) {
    //     return tokenInstance.balanceOf(admin);
    //   }).then(function(balance) {
    //     assert.equal(balance.toNumber(), 999990, 'returns all unsold dapp tokens to admin');
    //     // Check that the contract has no balance
    //     balance = web3.eth.getBalance(tokenSaleInstance.address)
    //     assert.equal(balance.toNumber(), 0);
    //   });
    // });
});