const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');

// Routes
router.get('/', commentCtrl.findAllComments);
router.get('/:id', commentCtrl.findOneComment);
router.post('/', commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;