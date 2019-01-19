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
});

module.exports = router;
