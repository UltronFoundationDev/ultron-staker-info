// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./Decimal.sol";

contract StakersConstants {
    using SafeMath for uint256;

    uint256 internal constant OK_STATUS = 0;
    uint256 internal constant FORK_BIT = 1;
    uint256 internal constant OFFLINE_BIT = 1 << 8;
    uint256 internal constant CHEATER_MASK = FORK_BIT;
    uint256 internal constant PERCENT_UNIT = 1000000;

    function minStake() public pure returns (uint256) {
        return 1 * Decimal.unit(); // 1 ULX
    }

    function minStakeIncrease() public pure returns (uint256) {
        return 1 * Decimal.unit(); // 1 ULX
    }

    function minDelegation() public pure returns (uint256) {
        return 1 * Decimal.unit(); // 1 ULX
    }

    /**
     * @dev Maximum ratio of delegations a validator can have, say, 15 times of self-stake
     */
    function maxDelegatedRatio() public pure returns (uint256) {
        // 1600%
        return 16 * Decimal.unit();
    }

    /**
     * @dev The commission fee in percentage a validator will get from a delegation, e.g., 15%
     */
    function validatorCommission() public pure returns (uint256) {
        // 15%
        return (15 * Decimal.unit()) / 100;
    }

    /**
     * @dev The commission fee in percentage a validator will get from a contract, e.g., 30%
     */
    function contractCommission() public pure returns (uint256) {
        // 30%
        return (30 * Decimal.unit()) / 100;
    }

    function stakeLockPeriodTime() public pure returns (uint256) {
        return 60 * 60 * 24 * 7; // 7 days
    }

    function stakeLockPeriodEpochs() public pure returns (uint256) {
        return 3;
    }

    function delegationLockPeriodTime() public pure returns (uint256) {
        return 60 * 60 * 24 * 7; // 7 days
    }

    function unbondingStartDate() public pure returns (uint256) {
      return 1577419000;
    }

    function unbondingPeriod() public pure returns (uint256) {
      return 60 * 60 * 24 * 700; // 700 days
    }

    function unbondingUnlockPeriod() public pure returns (uint256) {
      return 60 * 60 * 24 * 30 * 6; // 6 months
    }

    function delegationLockPeriodEpochs() public pure returns (uint256) {
        return 3;
    }

    function maxStakerMetadataSize() public pure returns (uint256) {
        return 256;
    }

    event UpdatedBaseRewardPerSec(uint256 value);
    event UpdatedGasPowerAllocationRate(uint256 short, uint256 long);
}