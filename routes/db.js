var mysql  = require('mysql');

var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'root',
database : 'superWallet'
});

// 查找
function select() {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack)
        }
        console.log('connected as id ' + connection.threadId);
    })

    connection.query('SELECT * FROM demo', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is:', results);
    });
    connection.end();
}

//添加
function add() {
    let post = {
        id: 1,
        name: 'Hello MySql',
        age: 20,
        time: Date.now(),
        temp: 'deom'
    };
    let query = connection.query("INSERT INTO demo SET ?", post, function (error, results, fields) {
        if (error) throw error;
    })
    console.log(query.sql); //INSERT INTO posts 'id'=1, 'title'='Hello MySQL'
}

//修改
function updateETHINFO(UID,address,priKey) {

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack);
        }
        console.log('connected as id ' + connection.threadId);
    });

    var sqlPriKey = 'UPDATE ETHPriKeyWarehouse set priKey= ? where UID = ?';
    var sqlAddress = 'UPDATE ETHTOKEN set ETHAddress = ? where UID = ?';
    ///需要插入多次

    connection.query(sql, [priKey, UID], function (error, results, fields) {
        if (error) throw error;
        console.log('changed:' + results.changeRows + 'rows');
    });

    connection.query(sql, [address, UID], function (error, results, fields) {
        if (error) throw error;
        console.log('changed:' + results.changeRows + 'rows');
    });
    connection.end();
}

//获取address
function getETHaddress(UID){
	connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack);
        }
        console.log('connected as id ' + connection.threadId);
    });
	var sql = 'SELECT ETHAddress FROM ETHTOKEN WHERE UID = ?';
	var address = "";
	connection.query(sql, [UID], function (error, result) {
        if (error) throw error;
        console.log('changed:' + result.changeRows + 'rows');
        return result;
    });
    
}

//获取address
function getETHPri(UID){
	connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack);
        }
        console.log('connected as id ' + connection.threadId);
    });
	var sql = 'SELECT priKey FROM ETHPriKeyWarehouse WHERE UID = ?';
	connection.query(sql, [UID], function (error, result) {
        if (error) throw error;
        console.log('changed:' + result.changeRows + 'rows');
        return result;
    });
    
}

module.exports = {
 updateETHINFO,
 getETHPri,
 getETHaddress
}