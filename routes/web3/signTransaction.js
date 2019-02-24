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

	var message = req.body.Message;
	console.log("message:",message);
	// https://kovan.infura.io
	// https://mainnet.infura.io
	// 0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672
	// c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897
	var personalData = "0xe6aca2e8bf8ee69da5e588b0e4ba91e69697e9be99efbc81"
	var userAddress = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672"
	var userPri = "c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897";
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));
	
	web3.personal.sign(data,userAddress,userPri,
		function(data){
			console.log("data:",data);
		})
	
	
	
});

module.exports = router;
