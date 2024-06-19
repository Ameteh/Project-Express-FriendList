var express = require('express');
var router = express.Router();
var connection = require('../library/database');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // Query the database for the user
  connection.query('SELECT * FROM user WHERE email = ?', [username], function(err, results) {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.redirect('/login');
    }

    console.log(username);
    if (results.length > 0 && results[0].password === password) {
      var user = results[0];
      if (user.email === 'adminfl@gmail.com') {
        req.session.user = { username: user.email, role: 'admin' };
        console.log("PIN");
        res.redirect('/admin');
      } else {
        req.session.user = { username: user.email, role: 'user' };
        console.log("PINS")
        res.redirect('./');
      }
    } else {
      console.log("PINNNS")
      res.redirect('/login');
    }
  });
});

module.exports = router;