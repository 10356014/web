//----------------------------------------------------
// 透過require引用db.js的connection物件,
// 即使多個程式均引用, 在系統中只有一份connection物件.
//----------------------------------------------------
var connection = require('./db.js');

connection.query('SELECT * from store', function (error, results, fields) {
    if (error) throw error;
    for(var i=0; i<results.length; i++){
        console.log(results[i].stoNo);
    }
});