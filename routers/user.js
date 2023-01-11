const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.create);

router.get('/profile', passport.checkAuthentication, userController.profile);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}
    ),userController.create);

router.get('/signout',  userController.destroySession);

module.exports = router;