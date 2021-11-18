const mongoose = require('mongoose');
const userController = require('./Controller/users');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
//app.use(methodOverride('_method'),{methods:['POST','GET']})
app.set('view engine','ejs');
app.use(layouts);

app.get('/',userController.index);
app.get('/create',userController.create);
app.get('/delete/:id',userController.delete);
app.get('/update/:id/:email', userController.update);

app.listen('3000', ()=> console.log('express listen on port 3000'))
