const mongoose = require('mongoose');
const userController = require('./Controller/users');
const postController = require('./Controller/posts');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const UserModel = require('./Model/users');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
    // res.locals.loggedIn = req.isAuthenticated();
    // res.locals.currentUser= req.user;
    console.log(req.user);
    console.log(req.isAuthenticated());
    next();
})

app.use(methodOverride('_method',{methods:['POST','GET']}))
app.set('view engine','ejs');
app.use(layouts);

//users
app.get('/',userController.index);
app.get('/create',userController.createForm);
app.post('/create',userController.create);
app.delete('/delete/:id',userController.delete);
app.get('/update/:id/', userController.updateForm);
app.put('/update/:id', userController.update);
app.get('/login',userController.loginForm);
app.post('/login',userController.authenticate);
app.get('/logout',userController.logout);


//app.get('/info/:id',userController.userInfo); //take a user id and display his data.


// posts
app.get('/posts',postController.index);
app.get('/posts/create',postController.createForm);
app.post('/posts/create',postController.create);
app.delete('/posts/delete/:id',postController.delete);
app.get('/posts/update/:id/', postController.updateForm);
app.put('/posts/update/:id', postController.update);
app.get('/posts/find/:userID',postController.userPosts);

app.listen('3000', ()=> console.log('express listen on port 3000'))
