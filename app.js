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

app.use(methodOverride('_method',{methods:['POST','GET']}))
app.set('view engine','ejs');
app.use(layouts);

//home page
app.get('/',(req,res)=>res.render('home'));
//users
app.get('/users',userController.isAuthenticated,userController.isAdmin,userController.index);
app.get('/users/create',userController.createForm);
app.post('/users/create',userController.create);
app.delete('/users/delete/:id',userController.isAuthenticated,userController.isAdmin,userController.delete);
app.get('/users/update/:id',userController.isAuthenticated,userController.isAllowed, userController.updateForm);
app.put('/users/update/:id',userController.isAuthenticated,userController.isAllowed, userController.update);
app.get('/users/login',userController.loginForm);
app.post('/users/login',userController.authenticate);
app.get('/users/logout',userController.logout);
app.get('/userInfo',userController.isAuthenticated,userController.userInfo); 

//now only admin can show and delete users while users can edit their own info.
//i need to restrict the access of posts crud.

// posts
app.get('/posts',postController.index,postController.indexView);
app.get('/posts/show',postController.index,postController.postsView);
app.get('/posts/create',postController.createForm);
app.post('/posts/create',postController.create);
app.delete('/posts/delete/:id',postController.delete);
app.get('/posts/update/:id', postController.updateForm);
app.put('/posts/update/:id', postController.update);
app.get('/posts/user',postController.userPosts);

app.get('*', function(req, res){
    res.status(404).render('notFound');
  });
app.listen('3000', ()=> console.log('express listen on port 3000'))
