const userModel = require('../Model/users');

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
        //console.log(req.body);
        new userModel({ 
                name: {
                    firstName: req.body.fname,
                    lastName: req.body.lname
                },
                DoB:new Date(req.body.DoB),
                gender: true,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            
        }).save();
    },
    delete: (req,res)=>{
        userModel.deleteOne({_id:req.params.id})
        .then(()=> res.redirect('/'))
        .catch((err)=> console.log(`Error Occurd:${err}`));
    },
    update: (req,res)=>{
        userModel.updateOne({_id:req.params.id},{email:req.params.email})
        .then(()=>{
            console.log('user updated')})
        .catch((err)=>console.log(`Error Occurd:${err}`))
    }
}