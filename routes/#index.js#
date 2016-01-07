var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var passport = require('passport');
var User = require('../models/user');


// Root Route
router.get('/', function(req,res){
  res.render('landing');
});

// Register Form Route
router.get('/register',function(req,res){
  res.render('register');
});

// Signup Logic
router.post('/register',function(req,res){
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password,function(err,user){
    if(err){
      req.flash('error', err.message);
      return res.render('register');
    }
    passport.authenticate('local')(req,res,function(){
      req.flash('success', 'Welcome to YelpCamp '+user.username);
      res.redirect('/campgrounds');
    });
  });
});

// Login Form Route
router.get('/login',function(req,res){
  res.render('login');
});

// Login Form Logic
router.post('/login',passport.authenticate('local',
                                        {
                                          successRedirect: '/campgrounds',
                                          failureRedirect: '/login'
                                        }),function(req,res){});

// Logout Route
router.get('/logout',function(req,res){
  req.logout();
  req.flash('success', 'Logged you out');
  res.redirect('/campgrounds');
});

module.exports = router;