const mongoose = require('mongoose');
const userController = require('./Controller/users');
const postController = require('./Controller/posts');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
app.use(express.urlencoded({extended: true}));

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

// posts
app.get('/posts',postController.index);
app.get('/posts/create',postController.createForm);
app.post('/posts/create',postController.create);
app.delete('/posts/delete/:id',postController.delete);
app.get('/posts/update/:id/', postController.updateForm);
app.put('/posts/update/:id', postController.update);

app.listen('3000', ()=> console.log('express listen on port 3000'))
