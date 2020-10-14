// imports
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const articleCtrl = require('../controllers/article');

// Routes
router.get('/', auth, articleCtrl.findAllArticles);
router.get('/:id', auth, articleCtrl.findOneArticle);
router.post('/', auth, multer, articleCtrl.createArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/:id',auth, articleCtrl.deleteArticle);

module.exports = router;