require('dotenv').config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.17",
    networks: {
        local: {
            url: 'http://localhost:8545'
        },
        goerli: {
            url: 'https://goerli.infura.io/v3/648e5a1412c14b96a75eb8b4e3052682',
            accounts: [process.env.PRIVATE_KEY],
        },

    }
};
