var express = require('express');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./utils/db.js');
var respJson = require('./utils/responseJson.js');
var chainConfig = require('./utils/config.js')


function tranferETH(web3,fromAddress,fromPri,toAddress,amount,callback){
	var gaslimit = 99000
	var gasprice = 10e9
	console.log(web3,fromAddress,fromPri,toAddress,amount);
	web3.eth.getTransactionCount(fromAddress, web3.eth.defaultBlock.pending).then(function(nonce){
	    
	    // 获取交易数据
	    var txData = {
	        // nonce每次++，以免覆盖之前pending中的交易
	        nonce: web3.utils.toHex(nonce++),
	        // 设置gasLimit和gasPrice
	        gasLimit: web3.utils.toHex(gaslimit),   
	        gasPrice: web3.utils.toHex(gasprice),  
	        // 要转到哪个账号  
	        to: toAddress,
	        // 从哪个账号转
	        from: fromAddress,
	        // 0.1 以太币
	        value: web3.utils.toHex(amount),         
	        data: ''
	    }

	    var tx = new Tx(txData);

	    // 引入私钥，并转换为16进制
	    const privateKey = new Buffer(fromPri, 'hex'); 

	    // 用私钥签署交易
	    tx.sign(privateKey);

	    // 序列化
	    var serializedTx = tx.serialize().toString('hex');

	    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
	        if (!err) {
	            console.log(hash);
	            callback(hash);
	        } else {
	            console.error(err);
	            callback("error");
	        }
	    });
	});
}

/* GET home page. */
router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var fromAddress =  req.body.fromAddress;
	var toAddress = req.body.toAddress;
	var amount = req.body.amount;
	var type = req.body.type;
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));

	db.getETHPri(UID,function(data){
		var priKey = data;
		if (type == 0){
			tranferETH(web3,fromAddress,priKey,toAddress,amount*1.0*10e17,function(data){
				if (data != "error"){
					var respData = respJson.generateJson(1,0,"");
					resp.send(respData);
				}
			})
			
		}
		else if (type == 1){
			var respData = respJson.generateJson(1,0,"");
			//0x4743dd93d571c666a9153c54b136e10541e8d622 kovan bgs 合约地址
		}
		else{
			var respData = respJson.generateJson(0,0,"");
			resp.send(respData);
		}
	})

	// 引入ethereumjs-tx

	
	// 以太币转账    
	// 先获取当前账号交易的nonce
	//var fromAddress = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672"
	//var fromPri = "c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897"
	//10e17是一个以太币
	//
	//var amount = 10e16

	//var toAddress = '0x0bC432D9AEB839278457406Ddae25A6C41201e13'
	


});

module.exports = router;
