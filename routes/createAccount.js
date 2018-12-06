var express = require('express');
var Web3 = require('web3');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./db.js');
var respJson = require('./responseJson.js');

/* GET home page. */
router.post('/', function(req, resp, next) {

	console.log(req.body);
	var UID = req.body.UID;
	web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io"));
	var data = web3.eth.accounts.create()
	var newAddress = data.address
	var newPriKey = data.privateKey
	
	db.updateETHINFO(UID,newAddress,newPriKey,function(data){
		if (data == "ok"){
			resp.send(respJson.generateJson(1,0,""));
		}
		else{
			resp.send(respJson.generateJson(0,0,""));
		}
	})

	
});

module.exports = router;
