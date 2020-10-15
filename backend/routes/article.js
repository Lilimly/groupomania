// imports
const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

// Routes
router.get('/', articleCtrl.findAllArticles);
router.get('/:id', articleCtrl.findOneArticle);
router.post('/', articleCtrl.createArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;