// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var config = require('./config/database.js');

var path = require('path')

// configuration ===============================================================
mongoose.connect(config.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


// var testPost = mongoose.model('testPost', {content: String})

// const newPost = new testPost ({content: "Let's see if this appears in mongo"});

// newPost.save((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("It worked")
//     }
// })

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs'); // set up hbs for templating

app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
console.log("session initialized")
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/index.js')(app, passport)
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
