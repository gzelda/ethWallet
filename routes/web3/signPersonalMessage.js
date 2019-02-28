var express = require('express');
var Web3 = require('web3');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../utils/db.js');
var respJson = require('../utils/responseJson.js');
var async = require('async');
var utils = require('../utils/utils.js');
var chainConfig = require('../utils/config.js')


/* GET home page. */
router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var Msg = req.body.Message;
	console.log(Msg,typeof(Msg));
	

	if (typeof Msg == "string"){
		Msg = JSON.parse(Msg);
		console.log(Msg,typeof(Msg));
	}

	var data = Msg.data;

	console.log(Msg.data);
	// https://kovan.infura.io
	// https://mainnet.infura.io
	// 0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672
	// c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897
	var personalData = Msg.data
	var userAddress = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672"
	var userPri = "c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897";
	console.log("in gty:",chainConfig.chainServer);
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));
	console.log(web3.version)

	
	var signData = web3.eth.accounts.sign(personalData, userPri).signature;
	var result = {result:signData}
	var respData = respJson.generateJson(1,0,"请求成功",result);
	resp.send(respData);
});

module.exports = router;
