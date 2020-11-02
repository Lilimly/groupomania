// imports
const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

// Routes
router.get('/', articleCtrl.findAllArticles);
router.get('/:id/comments', commentCtrl.findAllComments);
router.get('/:id/likes', likeCtrl.findAllLikes);
router.get('/:id', articleCtrl.findOneArticle);
router.post('/', articleCtrl.createArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;