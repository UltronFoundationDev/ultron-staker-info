// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./ISFC.sol";

contract SfcAbiProxy {
  address internal sfcAddress;

  constructor(address _sfcAddress) public {
    sfcAddress = _sfcAddress;
  }

  function getStakerID(address addr) external view returns (uint256) {
    ISFC sfc = ISFC(sfcAddress);

    // Proxy the getValidatorID call to the SFC using it's new ABI
    uint256 validatorId = sfc.getValidatorID(addr);

    return validatorId;
  }
}