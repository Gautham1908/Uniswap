pragma solidity ^0.8.10;

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amounswapExactTokensForTokenstIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function WETH() external pure returns (address);

    function getAmountsOut(uint256 amountIn, address[] memory path)
        external
        view
        returns (uint256[] memory amounts);
}
