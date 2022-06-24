// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./CepToken.sol";

contract PtnCoinTokenSale {
    address adminAddress;
    uint256 public tokenPrice;
    CepToken public cepTokenContract;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(CepToken _tokenContract, uint256 _tokenPrice) {
        adminAddress = msg.sender;
        cepTokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x); // TODO: ?
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens / (10**18), tokenPrice)); // checking ETH format also
        require(cepTokenContract.balanceOf(address(this)) >= _numberOfTokens); //this => CepTokenSale's / address  refers to the address of the instance of the contract where the call is being made.
        require(cepTokenContract.transfer(msg.sender, _numberOfTokens)); // msg.sender refers to the address where the contract is being called from.

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == adminAddress);
        require(
            cepTokenContract.transfer(
                adminAddress,
                cepTokenContract.balanceOf(address(this))
            )
        );

        // address payable addr = payable(address(this));
        // selfdestruct(addr);
    }
}
