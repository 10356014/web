var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.loginPass=false;
    req.session.empName=''; 		
    res.render('loginForm', {});  
});

module.exports = router;