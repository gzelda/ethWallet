var express = require('express');
var router = express.Router();
var db = require('./utils/db.js');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var bodyParser = require('body-parser');
var chainConfig = require('./utils/config.js');
var respJson = require('./utils/responseJson.js');
/* GET home page. */
router.post('/', function(req, res, next) {

	var txHash = req.body.txHash;
	console.log(txHash)
	console.log(txHash.length);
	var len = txHash.length;
	var respData = {};
	var result = [];
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));
	//console.log(txHash[0]);
	//console.log(txHash[1]);
	
	(function iterator(i){
		//console.log(i,len);
		//console.log("txhash:",txHash[i-1]);
		web3.eth.getTransactionReceipt(txHash[i-1]).then(function(data){
			console.log(data); 

			if (data != null){
				//var respData = {status:1};
				result.push(1);
				
				//res.send(respJson.generateJson(1,0,"打包成功",respData));
			}
			else{
				//var respData = {status:0};
				result.push(0);
				//res.send(respJson.generateJson(1,1,"Hash未打包",respData));
			}
			if (i<len){
				iterator(i+1);
			}
			else{
				respData.status = result;
				res.send(respJson.generateJson(1,0,"请求成功",respData));
			}
		}).catch(err =>{
			result.push(0);
			if (i<len){
				iterator(i+1);
			}
			else{
				respData.status = result;
				res.send(respJson.generateJson(1,0,"请求成功",respData));
			}
			//res.send(respJson.generateJson(0,0,"链端请求失败",err));
		});
    })(1);
    
	/*
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));
	web3.eth.getTransactionReceipt(txHash).then(function(data){
		console.log(data); 

		if (data != null){
			var respData = {status:1};
			res.send(respJson.generateJson(1,0,"打包成功",respData));
		}
		else{
			var respData = {status:0};
			res.send(respJson.generateJson(1,1,"Hash未打包",respData));
		}
	}).catch(err =>{
		res.send(respJson.generateJson(0,0,"链端请求失败",err));
	});
	*/
});

module.exports = router;
