// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract IStakers {
  function getStakerID(address addr) external view returns (uint256);
}