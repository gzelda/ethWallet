var express = require('express');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./utils/db.js');
var respJson = require('./utils/responseJson.js');
var chainConfig = require('./utils/config.js')
const EthereumTx = require('ethereumjs-tx')


function tranferETH(web3,fromAddress,fromPri,toAddress,amount,gas,callback){
	//var gaslimit = 21000
	var gasprice = 41e9
	var gaslimit = 35000

	var gasTotal = gas*1e18
	if (gas > 1E-5*5 && gas < 1E-5*700)
		gaslimit = parseInt(gasTotal/gasprice);
	console.log(gas)
	console.log(gasprice,gaslimit);
	
	
	web3.eth.getTransactionCount(fromAddress, web3.eth.defaultBlock.pending).then(function(nonce){
	    console.log("！！！！！！！：",fromAddress,fromPri,toAddress,amount,nonce);
	    // 获取交易数据
	    //var newNonce = nonce + 1;

	    var txData = {
	        // nonce每次++，以免覆盖之前pending中的交易
	        nonce: '0x' + nonce.toString(16),
	        //web3.utils.toHex(newNonce),
	        // 设置gasLimit和gasPrice
	        gasLimit: web3.utils.toHex(gaslimit),   
	        gasPrice: web3.utils.toHex(gasprice),  
	        // 要转到哪个账号  
	        to: toAddress,
	        // 从哪个账号转
	        from: fromAddress,
	        value: web3.utils.toHex(amount),         
	        data: ''
	    }
	    var tx = new Tx(txData);

	    // 引入私钥，并转换为16进制
	    const privateKey = new Buffer(fromPri, 'hex'); 

	    // 用私钥签署交易
	    var txHash = tx.sign(privateKey);
	    
	    // 序列化
	    var serializedTx = tx.serialize().toString('hex');
	    //console.log("caoniyeye:",tx,serializedTx);
	    //console.log("caoninainai:",serializedTx.toString('hex'));
	    //console.log(EthereumTx(serializedTx).hash());
	    var a = new EthereumTx(serializedTx).hash().toString('hex');
	    var txHash = '0x'+a;
	    console.log(txHash);
	    console.log("准备发送");
	    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
	        if (!err) {
	            console.log("receipt:",hash);
	            callback(hash);
	        } else {
	            console.error("err:",err);
	            callback("error");
	        }
	    });
	});
	
}


function tranferBGS(web3,fromAddress,fromPri,toAddress,amount,gas,callback){
	var gasprice = 41e9
	var gaslimit = 35000

	var gasTotal = gas*1e18
	if (gas > 1E-5*5 && gas < 1E-5*700)
		gaslimit = parseInt(gasTotal/gasprice);
	console.log(gas)
	console.log(gasprice,gaslimit);
	console.log(fromAddress,fromPri,toAddress,amount);
	//console.log(web3,fromAddress,fromPri,toAddress,amount);
	web3.eth.getTransactionCount(fromAddress, web3.eth.defaultBlock.pending).then(function(nonce){
	    var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"assertion","type":"bool"}],"name":"_assert","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
	    var contractAddress = chainConfig.bgsAddress;
	    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
	    let data = myContract.methods.transfer(toAddress, amount).encodeABI();
	    // 获取交易数据
	    var txData = {
	        // nonce每次++，以免覆盖之前pending中的交易
	        nonce: '0x' + nonce.toString(16),
	        // 设置gasLimit和gasPrice
	        gasLimit: web3.utils.toHex(gaslimit),   
	        gasPrice: web3.utils.toHex(gasprice),  
	        // 要转到哪个账号  
	        to: contractAddress,
	        // 从哪个账号转
	        from: fromAddress,
	        value: "0x00",
	        data: data //和transfer eth的重大区别
	    }

	    var tx = new Tx(txData);

	    // 引入私钥，并转换为16进制
	    const privateKey = new Buffer(fromPri, 'hex'); 

	    // 用私钥签署交易
	    tx.sign(privateKey);

	    // 序列化
	    var serializedTx = tx.serialize().toString('hex');
	    var a = new EthereumTx(serializedTx).hash().toString('hex');
	    var txHash = '0x'+a;
	    console.log(txHash);
	    console.log("准备发送");
	    web3.eth.sendSignedTransaction('0x' +serializedTx).then(function(receipt){
	    	console.log("receipt:",receipt);
	    	callback(receipt.transactionHash);
	    }).catch(function(err){
	    	console.log("err:",err);
	    	callback("error");
	    })
	    /*
	    .on('transactionHash',function (txHash) {

		}).on('receipt', function (receipt) {
		    console.log("receipt:" + JSON.stringfy(receipt));
		    callback('ok');
		}).on('confirmation', function (confirmationNumber, receipt) {
			//console.log("receipt:" + receipt);
		    //console.log("confirmationNumber:" + confirmationNumber + " receipt:" + receipt);
		}).on('error', function (error) {
			console.log("error:" + JSON.stringfy(receipt));
			callback('error');
		});
		*/
	});
}

/* GET home page. */
router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var fromAddress =  req.body.fromAddress;
	var toAddress = req.body.toAddress;
	var amount = req.body.amount;
	var type = req.body.type;
	var gasPrice = req.body.gasPrice;
	web3 = new Web3(new Web3.providers.HttpProvider(chainConfig.chainServer));

	db.getETHKey(UID,function(data){
		var priKey = data.priKey;
		if (data == "error"){
			resp.send(respJson.generateJson(0,0,"数据库查询失败"));
		}
		else if (data.address != fromAddress){
			resp.send(respJson.generateJson(0,0,"用户地址与数据库不一致"));
		}
		else{
			if (type == 0){
				tranferETH(web3,fromAddress,priKey,toAddress,amount*1.0*10e17,gasPrice,function(data){
					if (data != "error"){
						var respData = respJson.generateJson(1,0,"请求成功",{txHash:data});
						resp.send(respData);
					}
					else{
						var respData = respJson.generateJson(0,0,"转账失败");
						resp.send(respData);
					}
				})			
			}
			else if (type == 1){
				tranferBGS(web3,fromAddress,priKey,toAddress,amount*1.0*10e3,gasPrice,function(data){
					if (data != "error"){
						var respData = respJson.generateJson(1,0,"请求成功",{txHash:data});
						resp.send(respData);
					}
					else{
						var respData = respJson.generateJson(0,0,"转账失败");
						resp.send(respData);
					}
				})
				//0x4743dd93d571c666a9153c54b136e10541e8d622 kovan bgs 合约地址
			}
			else{
				var respData = respJson.generateJson(0,0,"token类型传入错误");
				resp.send(respData);
			}
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
