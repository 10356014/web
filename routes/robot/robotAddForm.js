var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//----------------------
// 引用db.js
//----------------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var supplierData;
    var proTypeData;

    //------------------	
	// 先取出供應商資料
	//------------------
    pool.query('select * from supplier', function(err, results) {       
        if (err) {
            supplierData=[];
        }else{
            supplierData=results;
        }
       
        //---------------------	   
		// 再取出產品型態資料
		//---------------------
        pool.query('select * from proType', function(err, results) {
            if (err) {
                proTypeData=[];
            }else{
                proTypeData=results;
            }

            //------------------------------------------   
            // 將供應商及產品型態資料一起送給輸入表單
            //------------------------------------------
            res.render('productAddForm', {supplierData:supplierData, proTypeData:proTypeData});
       }); 
    }); 
});

module.exports = router;