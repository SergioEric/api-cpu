var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let max = [1,2,3,4,5,6]
  res.render('index', { title: 'API on Express', max:max});
});

module.exports = router;
