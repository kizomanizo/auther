const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const middlewareUser = require('../middlewares/getUser')
const middlewareToken = require('../middlewares/checktoken')


/* GET users listing. */
router.post('/login', middlewareUser.getUser, userController.login);
router.get('/', middlewareToken.checkToken, userController.all);
router.post('/', middlewareToken.checkToken, userController.create);
router.get('/:id', middlewareToken.checkToken, middlewareUser.getUser, userController.details)

module.exports = router;