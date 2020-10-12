const express = require('express');

const router = express.Router();
const likeCtrl = require('../controllers/like');

const auth = require('../middleware/auth');

// Routes
router.get('/', likeCtrl.findAllLikes);
router.get('/:id', likeCtrl.findOneLike);
router.post('/', likeCtrl.createLike);
router.delete('/:id', likeCtrl.deleteLike);

module.exports = router;