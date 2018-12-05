var express = require('express');
var Web3 = require('web3');
var router = express.Router();
var bodyParser = require('body-parser');


/* GET home page. */
router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var type = req.body.type;
	// https://kovan.infura.io
	// https://mainnet.infura.io
	// 0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672
	// c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897
	var currentAccount = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672";
	var cA2 = "0x0bC432D9AEB839278457406Ddae25A6C41201e13"
	web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
	web3.eth.getBalance(cA2).then((err,res)=>{
			if (res){
				console.log(res);
				//resp.send(res);
			}
			else{
				console.log(err);
				//resp.send(err);
			}
		}
	);

	var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"assertion","type":"bool"}],"name":"_assert","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
	
	var contractAddress = "0x2c02ce7A9C7024E67b70e9d5B353685191f4B56e";

	var myContract = new web3.eth.Contract(contractAbi, contractAddress);
	//console.log(myContract);
	myContract.methods.balanceOf(cA2).call({from: cA2}, function(error, result){
	    if(!error) {
	        console.log(result);
	    } else {
	        console.log(error);
	    }
	});


	resp.send("sss");
	//console.log("out");
	
});

module.exports = router;
