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
    create: (req,res)=>{
        new userModel({ 
                name: {
                    firstName: "shaima",
                    lastName: "Algamdi"
                },
                DoB:new Date("2000-10-10"),
                gender: true,
                userName: "shaima",
                email: "shaima@test.com",
                password: "shaimaA"
            
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