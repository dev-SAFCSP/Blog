const router = require('express').Router();
const postController = require('../Controller/posts');

router.get('/',postController.index,postController.indexView);
router.get('/create',postController.createForm);
router.post('/create',postController.create);
router.delete('/delete/:id',postController.delete);
router.get('/update/:id', postController.updateForm);
router.put('/update/:id', postController.update);
router.get('/all',postController.postsInfoWithUsersInfo);


module.exports = router;
