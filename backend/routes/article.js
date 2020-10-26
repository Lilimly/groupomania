// imports
const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Routes
router.get('/', auth, articleCtrl.findAllArticles);
router.get('/:id/comments', auth, commentCtrl.findAllComments)
router.get('/:id',auth, articleCtrl.findOneArticle);
router.post('/',auth, articleCtrl.createArticle);
router.put('/:id',auth, articleCtrl.modifyArticle);
router.delete('/:id',auth, articleCtrl.deleteArticle);

module.exports = router;