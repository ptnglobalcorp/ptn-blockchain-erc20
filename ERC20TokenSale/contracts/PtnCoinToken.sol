// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./EIP20Interface.sol";

contract PtnCoinToken is EIP20Interface {
    uint256 public totalSupply;
    address public minter;

    string public override name = "PTN Coin";
    string public override symbol = "PTN";
    string public standard = "PTN Token v1.0";
    uint8 public override decimals; // instead of floating point

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public override allowance;

    constructor(uint256 _initialAmount, uint8 _decimals) {
        minter = msg.sender; // who deployed the contract
        balances[minter] = _initialAmount;
        totalSupply = _initialAmount;
        decimals = _decimals;
    }

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        require(balances[msg.sender] >= _value);
        require(_to != address(0)); // 0x00000

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool success)
    {
        //allowance
        allowance[msg.sender][_spender] = _value;

        emit Approval(minter, _spender, _value);

        return true;
    }

    // Delegated Transfer
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        address spender = msg.sender;

        require(balanceOf(_from) >= _value); // throw and revert
        require(allowance[_from][spender] >= _value);
        require(_to != address(0));

        balances[_from] -= _value;
        balances[_to] += _value;

        allowance[_from][spender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
