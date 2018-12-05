var express = require('express');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var router = express.Router();
var bodyParser = require('body-parser');



/* GET home page. */
router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var fromAddress =  req.body.fromAddress;
	var toAddress = req.body.toAddress;
	var amout = req.body.amout;
	var type = req.body.type;

	// 引入ethereumjs-tx

	web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io"));
	// 以太币转账    
	// 先获取当前账号交易的nonce
	var fromAddress = "0x47B9Be7A0FC74Be3fccdECfC6d41d21D24D4a672"
	var fromPri = "c7a933bf8981d80ea212bb59d9c5af3a8295a2216e94eadc3649e09c94824897"
	//10e17是一个以太币
	//
	var amount = 10e16

	var toAddress = '0x0bC432D9AEB839278457406Ddae25A6C41201e13'
	var gaslimit = 99000
	var gasprice = 10e9
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
	            resp.send(hash);
	        } else {
	            console.error(err);
	            resp.send(err);
	        }
	    });
	});


});

module.exports = router;
