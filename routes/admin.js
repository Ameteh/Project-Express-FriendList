var express = require('express');
var router = express.Router();

var connection = require('../library/database');

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

module.exports = router;