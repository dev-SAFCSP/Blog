const mongoose = require('mongoose');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const UserModel = require('./Model/users');
const express = require('express');
const app = express();
const router = require('./routes/index');



mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));


// cookies and session setup
app.use(cookieParser('test'));
app.use(expressSession ({
    secret: 'test'
}));


// passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use((req , res , next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser= req.user;
    console.log(req.user);
    // console.log(req.isAuthenticated());
    next();
});

//view engin setup
app.use(methodOverride('_method',{methods:['POST','GET']}))
app.set('view engine','ejs');
app.use(layouts);

//routers
app.use('/',router);


//port setup
app.listen('3000', ()=> console.log('express listen on port 3000'))
