var express = require('express');
var Web3 = require('web3');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./utils/db.js');
var respJson = require('./utils/responseJson.js');
var chainConfig = require('./utils/config.js')
/* GET home page. */
router.post('/', function(req, resp, next) {

	console.log(req.body);
	var UID = req.body.UID;
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));
	var data = web3.eth.accounts.create()
	var newAddress = data.address
	var newPriKey = data.privateKey
	
	db.InsertETHKey(UID,newAddress,newPriKey,function(data){
		if (data == "ok"){
			var result = {"address":newAddress};
			resp.send(respJson.generateJson(1,0,"创建成功",result));
		}
		else{
			resp.send(respJson.generateJson(0,0,"创建失败"));
		}
	})

	
});

module.exports = router;
