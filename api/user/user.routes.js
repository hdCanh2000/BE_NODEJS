const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', auth('admin'), userController.addUser);
router.get('/', auth(['admin', 'user']), userController.getAllUser);
router.get('/:id', auth(['admin', 'user']), userController.getUserDetail);
router.put('/profile/:id', auth('user'), userController.updateProfile);
// router.put('/password', auth("user"), userController.changePassword);

module.exports = router;
