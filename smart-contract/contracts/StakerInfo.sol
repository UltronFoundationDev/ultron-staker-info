// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./ownership/Ownable.sol";
import "./ISFC.sol";

contract StakerInfo is Ownable {
  mapping (uint => string) public stakerInfos;

  address internal sfcContractAddress;

  constructor(address _sfcContractAddress) public {
    sfcContractAddress = _sfcContractAddress;
  }

  function updateStakerContractAddress(address _sfcContractAddress) external onlyOwner {
    sfcContractAddress = _sfcContractAddress;
  }

  event InfoUpdated(uint256 stakerID);

  function updateInfo(string calldata _configUrl) external {
    ISFC sfc = ISFC(sfcContractAddress);

    // Get validator Id from sfc
    uint256 validatorId = sfc.getValidatorID(msg.sender);

    // Check if address belongs to a staker
    require(validatorId != 0, "Address does not belong to a staker!");

    // Update config url
    stakerInfos[validatorId] = _configUrl;

    emit InfoUpdated(validatorId);
  }

  function getInfo(uint256 _validatorId) external view returns (string memory) {
    return stakerInfos[_validatorId];
  }
}