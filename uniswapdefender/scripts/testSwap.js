const hre = require("hardhat");

async function main() {
    let TestSwapContract;
    const TestSwapFactory = await hre.ethers.getContractFactory("testSwap");
    TestSwapContract = await TestSwapFactory.deploy();
    await TestSwapContract.deployed();


    console.log(`Deployed testSwap at ${TestSwapContract.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});