var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* POST home page. */
router.post('/', function(req, res, next) {
    //取得使用者傳來的參數
    var empNo=req.param("empNo");
    var password=req.param("password");

    pool.query('select * from login where empNo=? and password=?', [empNo, password], function(err, rows, fields) {
        if (err){
            req.session.loginPass=false;
            req.session.empName=''; 
            res.render('loginFail', {});     //登入失敗
        }else if(rows.length==0){
            req.session.loginPass=false;
            req.session.empName=''; 		
            res.render('loginFail', {});     //登入失敗		
        }else{	
            req.session.loginPass=true;
            req.session.empName=rows[0].empName; 		
            res.redirect('/loginSuccess');   //登入成功
        }
    });
});

module.exports = router;