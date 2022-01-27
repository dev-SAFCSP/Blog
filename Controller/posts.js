const postModel = require('../Model/posts');

module.exports={
    index: (req,res,next)=>{
        postModel.find({})
        .then((data)=>{
            res.locals.posts = data;
            next();
        })
        .catch((err)=>console.log(`Error Occurd:${err}`));
    },
    indexView:(req,res)=>{
        res.render('posts/index');
    },
    postsView:(req,res)=>{
        res.render('posts/show');
    },
    createForm:(req,res)=>{
        res.render('posts/create');
    },
    create: (req,res)=>{
        new postModel({ 
                title: req.body.title,
                text: req.body.text,
                userID: req.user._id
            
        }).save((err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        });
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
        }
        postModel.updateOne({_id:req.params.id},postInfo)
        .then(()=>res.redirect('/posts'))
        .catch((err)=>console.log(`Error Occurd:${err}`))
    },
    userPosts: (req,res)=>{
        postModel.find({userID:req.params.userID})
        .then((posts)=>{
            console.log(posts);
            res.locals.posts = posts;
            res.render('users/posts')
        });
    }
}