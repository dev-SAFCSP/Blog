const userModel = require('../Model/users');
const passport = require('passport');
const e = require('express');

module.exports={
    index: (req,res)=>{
        userModel.find({})
        .then((data)=>{
            res.locals.users = data;
            res.render('users/index');
        })
        .catch((err)=>console.log(`Error Occurd:${err}`));
    },
    createForm:(req,res)=>{
        res.render('users/create');
    },
    create: (req,res)=>{
        let user = new userModel({ 
                    name: {
                        firstName: req.body.fname,
                        lastName: req.body.lname
                    },
                    DoB:req.body.DoB,
                    gender: req.body.gender,
                    userName: req.body.userName,
                    email: req.body.email,
                    isAdmin: false
            });
            userModel.register(user,req.body.password,
                (error,user)=>{
                    if(error){
                        console.log(error);
                        res.send('there was an error');
                    }else{
                        res.redirect('/users')
                    }
                });
    },
    delete: (req,res)=>{
        userModel.deleteOne({_id:req.params.id})
        .then(()=> res.redirect('/users'))
        .catch((err)=> console.log(`Error Occurd:${err}`));
    },
    updateForm: (req,res)=>{
        userModel.findById({_id:req.params.id}).then(user=>{
            res.locals.user = user;
        console.log(' user from updateForm--->' + user);
            res.render('users/edit');
        }).catch((err)=>console.log(err));
    },
    update: (req,res)=>{
        let userInfo = {
            name: {
                firstName: req.body.fname,
                lastName: req.body.lname
            },
            DoB:new Date(req.body.DoB),
            gender: req.body.gender,
            email: req.body.email
        
        }
        console.log(userInfo);
        userModel.updateOne({_id:req.params.id},userInfo)
        .then(()=>res.redirect('/'))
        .catch((err)=>console.log(`Error Occurd:${err}`));
    },
    userInfo:(req,res)=>{
        res.render('users/userInfo');
    },
    loginForm: (req,res)=>{
        res.render('users/login');
    },
    authenticate: passport.authenticate('local',{
        failureRedirect: '/users/login',
        successRedirect: '/'
    }),
    logout: (req,res)=>{
        req.logout();
        res.redirect('/');
    },
    isAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
                next();
        }else{
            res.redirect('/users/login');
        }
    },
    isAdmin:(req,res,next)=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.redirect('/error');
        }
    },
    isAllowed:(req,res,next)=>{
        console.log(req.user._id == req.params.id || req.user.isAdmin);
        if(req.user._id == req.params.id){
            next();
        }else{
            res.redirect('/error');
        }
    },
    
}