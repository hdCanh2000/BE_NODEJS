const express = require('express');
const authController = require('./authController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/signup', authController.signup);
router.post('/refreshToken', authController.refreshToken);

module.exports = router;
