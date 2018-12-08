var express = require('express');
var Web3 = require('web3');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./utils/db.js');
var respJson = require('./utils/responseJson.js');
var async = require('async');
var utils = require('./utils/utils.js');
var chainConfig = require('./utils/config.js')


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
		
		web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));
		//console.log(currentAccount);
		var ETHget = utils.getETHBalance.bind(null,web3,currentAccount);
		var BGSget = utils.getBGSBalance.bind(null,web3,currentAccount);

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
				var ethBalance = parseInt(res.ethBalance)/10e17;
				var bgsBalance = parseInt(res.bgsBalance)/10e3;
				console.log(ethBalance,bgsBalance);
				data.ethBalance = ethBalance.toFixed(4);
				data.bgsBalance = bgsBalance.toFixed(4);
				var respData = respJson.generateJson(1,0,data);
				resp.send(respData);
			}

			
		})
		
	})
	
	
	
});

module.exports = router;
