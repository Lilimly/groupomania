const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const articleCtrl = require('../controllers/article');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);
router.get('/:id/articles', articleCtrl.findArticlesByUserId);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;