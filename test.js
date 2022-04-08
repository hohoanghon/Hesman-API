const Web3 = require("web3");
var web3 = new Web3('https://bsc-dataseed.binance.org/');
// var getTotalBalance ;
const abitest = require("./server/cron/BamiabiPrice.json");
const abi = require("./server/cron/BamiabiPrice.json");
const TEAM_HOLDER_ADDRESS =
[ '0x391a2ADb34702F485fb00A4c0aa13203FD62404e', 
                        '0x09E927f680475750bB5B66AB1919dE6fe3A50E3e',
                        '0x7EBF8FCc280a783CD40A1b0abdE367dC1c399a3D',
                        '0xC3D519b489A10c131C9df7Aa9F5597591FCAfd79', 
                        '0x86d2b502152C92E30d27e54d52975e4854564f51', 
                        '0xfeF2dfAe690D8A774D172CbA2c4f136a724FA1D8',
                        '0x46e8519017B2A7DAd1829662E47F605DdEF69502',
                        '0xB78a802bD701Ff9de3Bd4b8100E9730960E4a174',
                        '0x7A241FEDcD1BbBd97445c8F735a95bC1c2bD7500',
                        '0x284B8FD943A63902eb2Ab145cD3C920f4a2436C9', 
                        '0xAc3208B49c1c5c0C9E0dE94B6f56626702ECaA6b', 
                        '0x7AEA2658A50f12ADf6E3f6D1dA4D75C20f0C07ed', 
                        '0xf09F08B2eF17f31b101356C18bb887D71cF4B002', 
                        '0xf09F08B2eF17f31b101356C18bb887D71cF4B002', 
                        '0x211d68F013068Ea19E3B12b4beEaf23AE41a4869'
                        ];
async function getTotalBalance()
{
try {
    var MyContract= await new web3.eth.Contract(abi, "0xDbad544416Df0677254645422bB560AF8408cAe7");
    const balances = new Array(20);
    const eth = new Array(20);
    for ( index = 0; index< TEAM_HOLDER_ADDRESS.length; index++)
    {
        balances[index] = await MyContract.methods.balanceOf(TEAM_HOLDER_ADDRESS[index]).call();
        eth[index] = web3.utils.fromWei(balances[index], 'ether');
    }
    var totalBalances = 0;
    for ( index= 0;index < TEAM_HOLDER_ADDRESS.length;index++)
    {
        totalBalances = totalBalances + parseFloat(eth[index]) ;
    }
    return totalBalances;
} catch (error) {
    console.log(error)
}
}
// main()
async function getBurn()
{
    try {
        const contractBurn= await new web3.eth.Contract(abi, "0xDbad544416Df0677254645422bB560AF8408cAe7");
        const balances = await contractBurn.methods.balanceOf("0x000000000000000000000000000000000000dead").call();
        const value = web3.utils.fromWei(balances, 'ether') ;
        // console.log(eth);
        return parseFloat(value) ;
    } catch (error) {
        console.log(error);
    }
}
async function maxSupply()
{
    const maxSupplyValue = getTotalBalance();
    return maxSupplyValue ;
}
// async function totalSupply()
// {
//     return maxSupply().maxSupplyValue - getBurn().value;
// }
async function circulatingSupply()
{
    const circulatingSupplyValue = await maxSupply() - await getBurn() - await getTotalBalance();
    // console.log(circulatingSupplyValue);
    return circulatingSupplyValue;
}
async function marketCap()
{
    marketCapValue = 0.016 * await circulatingSupply();
    return marketCapValue;
}
async function getPrice()
{
    // const contractPrice= await new web3.eth.Contract(abitest, "0x4B78401b64165746725bF6D367e44E8D335eA436");
    const contractPrice= await new web3.eth.Contract(abitest, "0xb33602ac4bf84b144894cce8f6c39f6c2136340f");
    
    const price = await contractPrice.methods.getReserves().call();
    const valueReverses0 = web3.utils.fromWei(price._reserve0, 'ether') ;
    const valueReverses1 = web3.utils.fromWei(price._reserve1, 'ether') ;
    // priceFinal = parseFloat(valueReverses1)/parseFloat(valueReverses0)
    // priceFinal = parseFloat(valueReverses0)/parseFloat(valueReverses1);
    priceFinal = parseFloat(price._reserve0)/parseFloat(price._reserve1);
    console.log(priceFinal);
}
// marketCap().then((value)=>{console.log(value)})
getPrice()
module.exports = {
    circulatingSupply,
    getBurn,
    getTotalBalance
}