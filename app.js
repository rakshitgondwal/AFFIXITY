
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userProfile;

const port = 3000;
const app = express();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static('public'))

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

mongoose.connect('mongodb+srv://rakshitgondwal:chitkararakshit@cluster0.wofkim8.mongodb.net/affixity');


app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req,res){
    res.render('pages/auth');
});


app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                         //GET FUNCTIONS//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/signin", function(req,res){
    res.sendFile(__dirname + '/pages/signin.html');
} );

app.get("/signup", function(req,res){
    res.sendFile(__dirname + '/pages/signup.html');
} );

app.get("/landing",function(req,res){
    res.sendFile(__dirname + "/pages/landing/index.html")
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                         //POST FUNCTIONS//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/signin", function(req,res){
    res.redirect("/landing");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });