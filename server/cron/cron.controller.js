import axios from "axios";
import Web3 from 'web3';
var web3 = new Web3('https://bsc-dataseed.binance.org/');
const bamiAbiBalance = require("./BamiabiBalance.json");
const bamiAbiPrice = require("./BamiabiPrice.json");
import { TEAM_ADDRESS, BURN_ADDRESS, BAMI_SMART_CONTRACT_ADDRESS, BAMI_PRICE_SMART_CONTRACT_ADDRESS} from "../components/main/configs/server.config";
import MainModel from "../components/main/model/main.model"

async function getPrice() {
    try {
        const contractPrice= await new web3.eth.Contract(bamiAbiPrice, BAMI_PRICE_SMART_CONTRACT_ADDRESS);
        const getReserves = await contractPrice.methods.getReserves().call();
        const valueReverses0 = web3.utils.fromWei(getReserves._reserve0, 'ether') ;
        const valueReverses1 = web3.utils.fromWei(getReserves._reserve1, 'ether') ;
        const price = parseFloat(valueReverses0)/parseFloat(valueReverses1);
        const rows = await MainModel.getPrice();
        let value = {
            'price' : price
            };
        if (rows.length > 0) {
            await MainModel.updatePrice( 1 ,value);
        } else {
            value["id"] = 1;
            await MainModel.insertPrice(value);  
        }
        return price;
    } catch (error) {
        console.log(error);
    }
    
}

async function getTotalBalance()
{
try {
    var MyContract= await new web3.eth.Contract(bamiAbiBalance, BAMI_SMART_CONTRACT_ADDRESS);
    const balances = new Array(20);
    const eth = new Array(20);
    for ( var index = 0; index< TEAM_ADDRESS.length; index++)
    {
        balances[index] = await MyContract.methods.balanceOf(TEAM_ADDRESS[index]).call();
        eth[index] = web3.utils.fromWei(balances[index], 'ether');
    }
    var totalBalances = 0;
    for ( index= 0;index < TEAM_ADDRESS.length;index++)
    {
        totalBalances = totalBalances + parseFloat(eth[index]) ;
    }
    return totalBalances;
} catch (error) {
    console.log(error)
}
}
async function getBurn()
{
    try {
        const contractBurn= await new web3.eth.Contract(bamiAbiBalance, BAMI_SMART_CONTRACT_ADDRESS);
        const balances = await contractBurn.methods.balanceOf(BURN_ADDRESS).call();
        const value = web3.utils.fromWei(balances, 'ether') ;
        return parseFloat(value) ;
    } catch (error) {
        console.log(error);
    }
}
async function maxSupply()
{
    const maxSupplyValue = 250000000;
    return maxSupplyValue ;
}
async function totalSupply()
{
    return await maxSupply() - await getBurn();
}
async function circulatingSupplyVal()
{
    const circulatingSupplyValue = await maxSupply() - await getBurn() - await getTotalBalance();
    return circulatingSupplyValue;
}
async function marketCap()
{
    marketCapValue = 0.016 * await circulatingSupply();
    return marketCapValue;
}
async function calculatorSupply() {
  
    try {
        let data = {};

        // #1 Total Supply
        const circulatingSupply = await circulatingSupplyVal();

        // #2 Burn Balance
        let burnedValue = await getBurn();

        // #3 Sum Team Balance
        let totalTeamBalance = await getTotalBalance();


        const rows = await MainModel.getPrice();
        let value = {
            'burn' : burnedValue,
            'circulating_supply' : circulatingSupply,
            'team' : totalTeamBalance
        };
        console.log(value);
        if (rows.length > 0) {
            await MainModel.updatePrice( 1 ,value);
        } else {
            value["id"] = 1;
            await MainModel.insertPrice(value);
        }

    } catch (error) {
        console.log("CRON [calculatorSupply]:");
        console.log(error);
    }
    
}

async function queryTable() {
    const value = await MainModel.getPrice();
    console.log(value);
} 

module.exports = {
    getPrice,
    calculatorSupply,
    queryTable
}