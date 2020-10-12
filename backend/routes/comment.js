const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

// Routes
router.get('/', commentCtrl.findAllComments);
router.get('/:id', commentCtrl.findOneComment);
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;