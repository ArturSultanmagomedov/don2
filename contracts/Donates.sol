// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*
7) Написать таски для сети rinkeby (использовать "npx hardhat NAME_FILE -network renkeby").
*/
contract Donations {
  address public owner;

  address[] public donatersList; // 3) Хранить адреса всех пользователей сделавших пожертвования;
  mapping(address => uint256) public donations; // 4) Хранить суммы пожертвований каждого пользователя;

  constructor() {
    owner = msg.sender;
  }

  modifier ovnerOnly() {
    require(msg.sender == owner, "Caller is not owner.");
    _;
  }

  // 1) внести пожертвование (используйте msg.value);
  receive() external payable {
    require(msg.value > 0, "Incorrect value.");

    if (donations[msg.sender] == 0) donatersList.push(msg.sender);

    donations[msg.sender] += msg.value;
  }

  // 2) Вывести пожертвование на определенный адрес. Данное действие может сделать только создатель контракта;
  function withdrawal(uint256 _amount, address _withdrawAddress) external ovnerOnly {
    payable(_withdrawAddress).transfer(_amount);
  }

  function getTotalAmount(address _address) public view returns (uint256) {
    return donations[_address];
  }

  function getDonaters() public view returns (address[] memory) {
    return donatersList;
  }
}
