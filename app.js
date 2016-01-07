var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    passport = require('passport'),
    methodOverride = require('method-override'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds'),
    flash = require('connect-flash');


//requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// dev database seed/unseed
//seedDB();

/// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'This is the secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(3030, 'localhost', function(){
  console.log('The YelpCamp server has started');
});