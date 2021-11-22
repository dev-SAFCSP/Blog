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
    updateForm: (req,res)=>{
        userModel.findById({_id:req.params.id}).then(user=>{
            res.locals.user = user;
        console.log(' user from updateForm--->' + user);
            res.render('users/edit');
        }) 
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
        .catch((err)=>console.log(`Error Occurd:${err}`))
    }
}