const router = require('express').Router();
const userController = require('../Controller/users');

router.get('/',userController.isAuthenticated,userController.isAdmin,userController.index);
router.get('/create',userController.createForm);
router.post('/create',userController.create);
router.delete('/delete/:id',userController.isAuthenticated,userController.isAdmin,userController.delete);
router.get('/update/:id',userController.isAuthenticated,userController.isAllowed, userController.updateForm);
router.put('/update/:id',userController.isAuthenticated,userController.isAllowed, userController.update);
router.get('/login',userController.loginForm);
router.post('/login',userController.authenticate);
router.get('/logout',userController.logout);
router.get('/userInfo',userController.isAuthenticated,userController.userInfo); 


module.exports = router;