const postModel = require('../Model/posts');

module.exports={
    index: (req,res)=>{
        postModel.find({})
        .then((data)=>{
            res.locals.posts = data;
            res.render('posts/index');
        })
        .catch((err)=>console.log(`Error Occurd:${err}`));
    },
    createForm:(req,res)=>{
        res.render('posts/create');
    },
    create: (req,res)=>{
        new postModel({ 
                title: req.body.title,
                text: req.body.text,
                userID: "6197acc20ce0306cc3339135"
            
        }).save();
    },
    delete: (req,res)=>{
        postModel.deleteOne({_id:req.params.id})
        .then(()=> res.redirect('/posts'))
        .catch((err)=> console.log(`Error Occurd:${err}`));
    },
    updateForm: (req,res)=>{
        postModel.findById({_id:req.params.id}).then(post=>{
            res.locals.post = post;
            res.render('posts/edit');
        }) 
    },
    update: (req,res)=>{
        let postInfo = {
            title:req.body.title,
            text: req.body.text,
            userID: "619419dd0499eea412a98b56",
        }
        postModel.updateOne({_id:req.params.id},postInfo)
        .then(()=>res.redirect('/posts'))
        .catch((err)=>console.log(`Error Occurd:${err}`))
    },
    userPosts: (req,res)=>{
        postModel.find({userID:req.params.userID})
        .then((post)=>{console.log(post)});
    }
}