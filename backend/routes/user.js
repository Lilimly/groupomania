const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, userCtrl.findAllUsers);
router.get('/:id', auth, userCtrl.findOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id',auth, userCtrl.deleteUser);

module.exports = router;