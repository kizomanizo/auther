const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levels');
const middlewareLevel = require('../middlewares/getLevel')
const middlewareToken = require('../middlewares/checktoken')


/* GET levels listing. */
router.get('/', middlewareToken.checkToken, levelController.all);
router.post('/', middlewareToken.checkToken, levelController.create);
router.get('/:id', middlewareToken.checkToken, middlewareLevel.getLevel, levelController.details);
router.patch('/:id', middlewareToken.checkToken, middlewareLevel.getLevel, levelController.update);
router.delete('/:id', middlewareToken.checkToken, middlewareLevel.getLevel, levelController.delete);

module.exports = router;