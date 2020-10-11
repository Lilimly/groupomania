// imports
const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', articleCtrl.findAllArticles);
router.get('/:id', articleCtrl.findOneArticle);
router.post('/', multer, articleCtrl.createArticle);
router.put('/:id', multer, articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;