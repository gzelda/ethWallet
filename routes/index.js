var express = require('express');
var router = express.Router();
var db = require('./utils/db.js');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var chainConfig = require('./utils/config.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	var gaslimit = 99000
	var gasprice = 10e9
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));

	var gaslimit = 99000
	var gasprice = 10e9
	//console.log(web3,fromAddress,fromPri,toAddress,amount);

	fromAddress = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672";
	fromPri = "c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897";
	toAddress = "0xe27F6A084F796D693A8f8Aa93bEc8c59979FC0d1";
	amount = 10000;

	web3.eth.getTransactionCount(fromAddress, web3.eth.defaultBlock.pending).then(function(nonce){
	    var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"assertion","type":"bool"}],"name":"_assert","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
	    var contractAddress = chainConfig.bgsAddress;
	    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
	    let data = myContract.methods.transfer(toAddress, amount).encodeABI();
	    // 获取交易数据
	    var txData = {
	        // nonce每次++，以免覆盖之前pending中的交易
	        nonce: web3.utils.toHex(nonce++),
	        // 设置gasLimit和gasPrice
	        gasLimit: web3.utils.toHex(gaslimit),   
	        gasPrice: web3.utils.toHex(gasprice),  
	        // 要转到哪个账号  
	        to: contractAddress,
	        // 从哪个账号转
	        from: fromAddress,
	        // 0.1 以太币
	        value: "0x00",
	        data: data
	    }

	    var tx = new Tx(txData);

	    // 引入私钥，并转换为16进制
	    const privateKey = new Buffer(fromPri, 'hex'); 

	    // 用私钥签署交易
	    tx.sign(privateKey);

	    // 序列化
	    var serializedTx = '0x' + tx.serialize().toString('hex');

	    web3.eth.sendSignedTransaction(serializedTx).on('transactionHash',function (txHash) {

		}).on('receipt', function (receipt) {
		    console.log("receipt:" + receipt);
		}).on('confirmation', function (confirmationNumber, receipt) {
			//console.log("receipt:" + receipt);
		    console.log("confirmationNumber:" + confirmationNumber + " receipt:" + receipt);
		}).on('error', function (error) {
			console.log("error:" + receipt);
		});

	});
});

module.exports = router;
