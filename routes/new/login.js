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
    var userName=req.param("userName");
    var password=req.param("password");

    pool.query('select * from employee where empNo=? and password=?', [userName, password], function(err, rows, fields) {
        if (err){
		    //如果失敗, 清除session中的資訊.
            req.session.loginPass=false;
			req.session.empNo=''; 
            req.session.userName=''; 
            res.render('loginFail', {});
		}else if(rows.length==0){
		    //如果帳/密不符, 清除session中的資訊.		
            req.session.loginPass=false;
			req.session.empNo=''; 
            req.session.userName=''; 		
            res.render('loginFail', {});
        }else{	
		    //如果成功, 將登入者姓名記錄在session中.
            req.session.loginPass=true;
			req.session.empNo=rows[0].empNo; 
            req.session.userName=rows[0].empName; 		
            //res.redirect('/loginSuccess');
            res.redirect('/index');
		}
    });
});

module.exports = router;