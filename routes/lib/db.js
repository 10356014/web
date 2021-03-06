
/*
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'mysql',
    database : 'project'
});

connection.connect(function(err) {
    if (err) throw err;
});

//---------------------------------
// 引用此模組時將匯出connection物件
//---------------------------------
module.exports = connection;
*/


var mysql = require('mysql');

//------------------------
// 建立資料庫連線池
//------------------------
var pool  = mysql.createPool({
    user: 'root',
    password: 'mysql',
    host: '127.0.0.1',
    database: 'project', 
    //database: 'north',
    waitForConnections : true, 
    connectionLimit : 10       
});

//----------------------------
// 引用此模組時將匯出pool物件
//----------------------------
module.exports = pool;