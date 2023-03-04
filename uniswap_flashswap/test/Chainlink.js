const Chainlink = artifacts.require("Chainlink")

contract("Chainlink", () => {
    let chainlink
    beforeEach(async () => {
        chainlink = await Chainlink.new()
    })

    it("getLatestPrice", async () => {
        const price = await chainlink.getLatestPrice()
        console.log(`price: ${price}`)
    })
})