const { ethers } = require('hardhat');
const { signMetaTxRequest } = require('../src/signer');
const { readFileSync, writeFileSync } = require('fs');


const DEFAULT_NAME = 'sign-test';

function getInstance(name) {
  const address = JSON.parse(readFileSync('deploy.json'))[name];
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
  return ethers.getContractFactory(name).then(f => f.attach(address));
}

async function main() {
  const forwarder = await getInstance('MinimalForwarder');
  const uniswapswap = await getInstance("testSwap");
  const USDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

  const { NAME: name, PRIVATE_KEY: signer } = process.env;
  const from = new ethers.Wallet(signer).address;
  console.log("from: ",from)
  console.log(`Signing registration of ${name || DEFAULT_NAME} as ${from}...`);
  // uint amount0Out, uint amount1Out, address to, bytes calldata data
  const data = uniswapswap.interface.encodeFunctionData('swap',[WETH,USDC,ethers.utils.parseEther('0.1'),from,1675688481]);
  const result = await signMetaTxRequest(signer, forwarder, {
    to: uniswapswap.address, from, data
  });

  writeFileSync('tmp/request.json', JSON.stringify(result, null, 2));
  console.log(`Signature: `, result.signature);
  console.log(`Request: `, result.request);

  

}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}