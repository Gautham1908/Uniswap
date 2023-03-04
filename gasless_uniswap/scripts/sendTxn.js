const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');
const { ethers} = require('hardhat');
const { readFileSync, writeFileSync } = require('fs');

const WETH_ABI = require('../abi/wethABI.json');
const { relay } = require('../autotasks/relay');

require('dotenv').config()
const { NAME: name, PRIVATE_KEY: signer, RELAYER_API_KEY: api_key, RELAYER_API_SECRET: api_secret } = process.env;

const network = 'goerli' // use rinkeby testnet
const ethersProvider = ethers.getDefaultProvider(network)
let Ethersprovider = ethers.getDefaultProvider("https://goerli.infura.io/v3/738d607b3d294eb58ad33862a792d0bc");

const credentials = { apiKey: api_key, apiSecret: api_secret };
const provider = new DefenderRelayProvider(credentials);
const signerRelay = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });



const USDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const from = new ethers.Wallet(signer).address;

function getInstance(name) {
    const address = JSON.parse(readFileSync('deploy.json'))[name];
    if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
    return ethers.getContractFactory(name).then(f => f.attach(address));
}

async function main(){
    const [sig] = await ethers.getSigners();
    console.log("Address  ",sig.address)
  const weth = new ethers.Contract(WETH, WETH_ABI, signerRelay);
  const uniswapswap = await getInstance("testSwap");
  const forwarder = await getInstance('MinimalForwarder');
  console.log("Address of contract is ",uniswapswap.address)
  
  const balanceOfFrom = await ethersProvider.getBalance(from);
  let ethBalance = balanceOfFrom.toString();
  console.log("Balance of ",from," is ",ethBalance);

  const tx = await weth.connect(sig).approve(uniswapswap.address,ethers.utils.parseEther('0.1'));
  const mined = await tx.wait();
  console.log("Approve tx hash", mined.transactionHash)

  const { request, signature } = JSON.parse(readFileSync('tmp/request.json'));


  try {
    await relay(forwarder, request, signature,[forwarder.address])
    // let minedTx = await hash.wait()
    // console.log("hash : ",minedTx)
  } catch(error){
    console.log("error ",error)
  }

}

main()
// if (require.main === module) {
//     main().then(() => process.exit(0))
//       .catch(error => { console.error(error); process.exit(1); });
//   }