const userModel = require('../Model/users');

module.exports={
    index: (req,res)=>{
        userModel.find({})
        .then((data)=>{
            res.end();
            console.log(data)})
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
        userModel.deleteOne({userName:req.params.userName})
        .then(()=> {
            res.end();
            console.log('one user is deleted')})
        .catch((err)=> console.log(`Error Occurd:${err}`));
    },
    update: (req,res)=>{
        userModel.updateOne({_id:req.params.id},{email:req.params.email})
        .then(()=>{
            res.end();
            console.log('user updated')})
        .catch((err)=>console.log(`Error Occurd:${err}`))
    }
}