var mysql  = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'superWallet'
});


function SQLquery(sql,param,callback){
	pool.getConnection(function(err,conn){
        if(err){
        	console.log("SQLerr")
            callback("error");
        }else{
        	console.log("SQLsuccess")
            conn.query(sql,param,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                //console.log(qerr,vals,fields)
                callback(vals);
            });
        }
    });
	/*
	connection.query(sql, param, function (error, results, fields) {
        if (error) {
        	console.log("error");
        	callback("error");
        }
        else{
        	console.log('sql:' + results);
        	callback(results);
        }
        
    });
    */
}

//修改
function updateETHINFO (UID,address,priKey,callback) {

    console.log(UID,address,priKey);
    var sqlPriKey = 'INSERT INTO ETHPriKeyWarehouse(UID,priKey) values(?,?)';
    var sqlAddress = 'UPDATE ETHTOKEN set ETHAddress = ? where UID = ?';
    ///需要插入多次
    /*
    connection.query(sqlPriKey, [priKey, UID], function (error, results, fields) {
        if (error) throw error;
        console.log('sql:' + results);
    });

    connection.query(sqlAddress, [address, UID], function (error, results, fields) {
        if (error) throw error;
        console.log('sql:' + results);
    });
    */
    var res1 = SQLquery(sqlPriKey,[UID, priKey],function(data){
    	console.log('data:' + data);
    	if (data!="error"){
    		var res2 = SQLquery(sqlAddress,[address, UID],function(data){
    			console.log(data);
    			if (data!="error"){
    				callback("ok");	
    			}
    			else
    				callback("error");
    		});
    	}
    	else{
    		callback("error");	
    	}
    	
    });
}


//获取address
function getETHaddress (UID,callback){
	
	var sql = 'SELECT ETHAddress FROM ETHTOKEN WHERE UID = ?';

	
	SQLquery(sql,[UID],function(data){
		console.log('data:' + data);
		if (data!= "error"){

			callback(data[0].ETHAddress);
		}
	})

	/*
	connection.query(sql, [UID], function (error, result) {
        if (error) {
        	console.log(error);
			throw error;
        }
        else{
        	console.log('sql:' + result[0].ETHAddress);
	        //console.log(UID + 'gtygtygty(((((((((('+JSON.stringfy(result))
	        //result;
        	callback(result[0].ETHAddress);
        }
        
    });

	connection.end();
    */
}


//获取address
function getETHPri(UID,callback){

	var sql = 'SELECT priKey FROM ETHPriKeyWarehouse WHERE UID = ?';
	/*
	connection.query(sql, [UID], function (error, result) {
        if (error) throw error;
        console.log('sql:' + result);
        callback(result[0].priKey);
    });
    */

    SQLquery(sql,[UID],function(data){
		console.log('data:' + data);
		if (data!= "error"){

			callback(data[0].priKey);
		}
	})
    
}

module.exports = {
 getETHPri,
 getETHaddress,
 updateETHINFO
}