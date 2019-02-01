var mysql  = require('mysql');


var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'keyinstance.ci2ntp4wej15.ap-southeast-1.rds.amazonaws.com',
    user: 'tygavingavin',
    password: 'gavinKeyWareHouse',
    database: 'KeyWarehouse'
});


function SQLquery(sql,param,callback){
	pool.getConnection(function(err,conn){
        if(err){
        	console.log("SQLerr",err)
            callback("error");
        }else{
        	console.log("SQLsuccess")
            conn.query(sql,param,function(qerr,vals,fields){
                //释放连接
                pool.releaseConnection(conn);
                //事件驱动回调
                //console.log(qerr,vals,fields)
                if (vals == undefined || vals =="")
                    callback("error");
                else
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
function InsertETHKey (UID,address,priKey,callback) {

    console.log(UID,address,priKey);
    var sqlPriKey = 'INSERT INTO ETHPriKeyWarehouse(UID,address,priKey) values(?,?,?)';
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
    var res = SQLquery(sqlPriKey,[UID, address,priKey],function(data){
    	console.log('data:' + data);
    	if (data!="error"){
            callback("ok");
    	}
    	else{
    		callback("error");	
    	}
    	
    });
}


//获取address
function getETHaddress (UID,callback){
	console.log(UID);
	var sql = 'SELECT address FROM ETHPriKeyWarehouse WHERE UID = ?';

	
	SQLquery(sql,[UID],function(data){
		console.log('data:' + data);
        console.log('data:' + data.length);
		if (data!= "error"){
            if (data.length == 0){
                callback("error");
            }
			callback(data[0].address);
		}
        else{
            callback("error");
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
            if (data.length == 0){
                callback("error");
            }
            callback(data[0].priKey);
        }
        else{
            callback("error");
        }
	})
    
}

//获取address
function getETHKey(UID,callback){

    var sql = 'SELECT address,priKey FROM ETHPriKeyWarehouse WHERE UID = ?';
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
            if (data.length == 0){
                callback("error");
            }
            callback(data[0]);
        }
        else{
            callback("error");
        }
    })
    
}


module.exports = {
 getETHPri,
 getETHaddress,
 InsertETHKey,
 getETHKey
}