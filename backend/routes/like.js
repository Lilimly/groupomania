const express = require('express');

const router = express.Router();
const likeCtrl = require('../controllers/like');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', auth, likeCtrl.getAllLikes);
router.get('/:id', auth, likeCtrl.getOneLike);
router.post('/', auth, multer, likeCtrl.createLike);
router.put('/:id', auth, multer, likeCtrl.modifyLike);
router.delete('/:id', auth, likeCtrl.deleteLike);

module.exports = router;