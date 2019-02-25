var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res, next) {
  Users.find({}, (err, users) => {
    if (err) console.log(err)
    else res.render('index', {
      users,
      title: 'Authentication'
    })
  })
});

router.get('/signup', function (req, res, next) {
  res.render('signup', {
    registered: false
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    login: false
  });
});

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    newUser = {
      username: req.body.username,
      password: hash
    }
    Users.create(newUser, (err) => {
      if (err) console.log(err)
      else {
        console.log('user registered')
        res.render('index', {
          registered: true
        })
      }
    })
  });
})

router.post('/login', function (req, res) {
  Users.findOne({
    username: req.body.username
  }).then(function (user) {
    if (!user) {
      res.send("incorrect username");
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          res.send('password correct!');
        } else {
          res.send('password incorrect!');
        }
      });
    }
  });
});

module.exports = router;