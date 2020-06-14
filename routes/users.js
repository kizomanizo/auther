const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const middlewareUser = require('../middlewares/getUser')
const middlewareToken = require('../middlewares/checktoken')


/* GET users listing. */
router.post('/login', middlewareUser.getUser, userController.login)
router.get('/', middlewareToken.checkToken, userController.all)
router.post('/', middlewareToken.checkToken, userController.create)
router.post('/admin', userController.create) // Temporary Initial route for creating first admin @todo disable on Prod
router.get('/:id', middlewareToken.checkToken, middlewareUser.getUser, userController.details)
router.patch('/:id', middlewareToken.checkToken, middlewareUser.getUser, userController.update)
router.delete('/:id', middlewareToken.checkToken, middlewareUser.getUser, userController.delete)

module.exports = router;