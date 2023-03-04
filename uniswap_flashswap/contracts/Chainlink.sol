// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

//import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Chainlink {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        // ALGO / USD
        priceFeed = AggregatorV3Interface(
            0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c
        );
    }

    function getLatestPrice() public view returns (int256) {
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        // for ETH / USD price is scaled up by 10 ** 8
        return price / 1e8;
    }
}

interface AggregatorV3Interface {
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}
