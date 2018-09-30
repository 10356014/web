var express = require('express');
var router = express.Router();

/*
/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'index', menuId:'index'});
});


router.get('/', function(req, res, next) {
  res.render('storeListByPage', {page:'/storeListByPage', menuId:'/storeListByPage'});
});

router.get('/', function(req, res, next) {
  res.render('designerListByPage', {page:'/designerListByPage', menuId:'/designerListByPage'});
});


router.get('/', function(req, res, next) {
  res.render('robotListByPage', {page:'robotListByPage', menuId:'robotListByPage'});
});

/*
router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});
*/


module.exports = router;
