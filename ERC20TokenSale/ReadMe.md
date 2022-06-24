# Create ERC20 Token

The standard can be found here: <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md>

## TODO

    [*] Create Own Cryptocurrency named 'CEP'
    [*] Token sale
        1. Provision Tokens to Token Sale Contract
        2. Assign an Admin
        3. Buy Tokens
        4. End Sales
    [] Demo DApp (in next workshop) :D 

# Snippets

## truffle

* `truffle create contract xxx`
* `truffle compile`
* `truffle migrate --reset`
* `truffle console`

* `CepToken.deployed(100).then(function(instance){ tokenInstance = instance; })`
* `tokenInstance`
* `tokenInstance.name()`
* `tokenInstance.symbol()`
* `tokenInstance.standard()`
* `tokenInstance.totalSupply()`
* `accounts (10 accounts default`
* `tokenInstance.balanceOf(xxx).then(())`
* `tokenInstance.transfer(accounts[1], 1)`

## web3

* `web3.eth.getAccounts().then((accounts) => accounts = accounts);`

# Notes

* Truffle test framework adopted the well-known Mocha
* external-vs-public-best-practices: <https://ethereum.stackexchange.com/questions/19380/external-vs-public-best-practices>
* Solidity: How to know when to use Abstract Contracts vs Interfaces: <https://medium.com/upstate-interactive/solidity-how-to-know-when-to-use-abstract-contracts-vs-interfaces-874cab860c56>

# Links

* <https://eth-converter.com/>
* <https://www.youtube.com/watch?v=_160oMzblY8>
* <https://dev.to/damcosset/blockchain-what-is-in-a-block-48jo#:~:text=In%20the%20Bitcoin%20world%2C%20a,to%20be%20processed%20per%20second>.
* <https://docs.soliditylang.org/en/v0.8.14/introduction-to-smart-contracts.html>
* <https://remix.ethereum.org/>
* <https://betterprogramming.pub/a-few-tips-for-unit-testing-ethereum-smart-contract-in-solidity-d804062068fb>
* <https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript/>
* <https://www.tutorialspoint.com/solidity/solidity_arrays.htm>
* <https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/edit>
* <https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9b37104655/contracts/token/ERC20/ERC20.sol>
* <https://github.com/ConsenSys/Token-Factory/blob/master/contracts/StandardToken.sol>
* <https://vbpo.com.vn/news/blog-40/blockchain-la-gi-hoat-dong-cua-blockchain-nhu-the-nao-ung-dung-ra-sao>
* <https://1upnote.me/post/2018/01/block-chain-la-gi/>
