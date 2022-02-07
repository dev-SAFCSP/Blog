const router = require('express').Router();
const userRouter = require('./users');
const postRouter = require('./posts');


router.get('/',(req,res)=>res.render('home'));

router.use('/users',userRouter);
router.use('/posts',postRouter);

router.get('*', function(req, res){
    res.status(404).render('notFound');
  });


module.exports = router;