var express = require('express');
var router = express.Router();
var db = require('./db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.updateETHINFO("testUID","address","priKey");
  res.render('index', { title: 'Express' });
});

module.exports = router;
