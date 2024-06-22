var express = require('express');
var router = express.Router();
var connection = require('../library/database');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, function(err, hashedPassword) {
    if (err) {
      console.error('Error hashing password: ' + err.stack);
      return res.redirect('/register');
    }

    var user = { email: username, password: hashedPassword };

    // Insert the new user into the database
    connection.query('INSERT INTO user SET ?', user, function(err, results) {
      if (err) {
        console.error('Database insertion error: ' + err.stack);
        return res.redirect('/register');
      }

      res.redirect('/login');
    });
  });
});

module.exports = router;