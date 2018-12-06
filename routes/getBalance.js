var express = require('express');
var Web3 = require('web3');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./db.js');
var respJson = require('./responseJson.js');
var async = require('async');

function getETHBalance(web3,address,callback){
	web3.eth.getBalance(address).then((err,res)=>{
			if (res){
				console.log(res);
				callback(null,res);
				//resp.send(res);
			}
			else{
				console.log(err);
				callback(null,err);
				//resp.send(err);
			}
		}
	);
}

function getBGSBalance(web3,address,callback){
	var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"assertion","type":"bool"}],"name":"_assert","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
	
	var contractAddress = "0x2c02ce7A9C7024E67b70e9d5B353685191f4B56e";

	var myContract = new web3.eth.Contract(contractAbi, contractAddress);
	//console.log(myContract);
	myContract.methods.balanceOf(address).call({from: address}, function(err, res){
	    if(!err) {
	        //console.log(res);
	        callback(null,res);
	    } else {
	        console.log(err);
	        //callback(err);
	    }
	});
}

/* GET home page. */
router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var type = req.body.type;
	// https://kovan.infura.io
	// https://mainnet.infura.io
	// 0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672
	// c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897

	//var currentAccount = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672";
	//var cA2 = "0x0bC432D9AEB839278457406Ddae25A6C41201e13"
	db.getETHaddress(UID,function(data){
		var currentAccount = data;
		console.log(currentAccount);
		
		web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
		//console.log(currentAccount);
		var ETHget = getETHBalance.bind(null,web3,currentAccount);
		var BGSget = getETHBalance.bind(null,web3,currentAccount);

		var result = {};
		result['ethBalance'] = ETHget;
		result['bgsBalance'] = BGSget;

		async.parallel(result,function(err,res){
 
			console.log("parallel");
	 
			if (err) {
				//console.log("err:")
				//console.log(err);
			}
			else{
				console.log("result:")
				console.log(res);
				var data = res;
				var respData = respJson.generateJson(1,0,data);
				resp.send(respData);
			}

			
		})
		
	})
	
	
	
});

module.exports = router;
