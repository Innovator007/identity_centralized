const express = require('express');
//const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.redirect('/login');
});

router.get('/signup', (req, res, next) => {
	res.render('signupSelect');
});

router.post('/signup', authController.signupSelect);

router.get('/signup/authority', (req, res, next) => {
    res.render('authoritySignupForm');
});
router.post('/signup/authority', authController.authSignup);

//Verifier
router.get('/signup/verifier', (req, res, next) => {
    res.render('verifierSignupForm');
});

router.get('/dashboard/authority', (req, res, next) => {
	res.render('Auth_dashboard');
});

router.get('/dashboard/verifier', (req,res, next) => {
    res.render('verifier_dashboard')
});

router.post('/api/signup/user', authController.userRegister);

router.post('/signup/verifier', authController.verSignup);

//Login
router.get('/login', (req, res, next) => {
    res.render('login');
});
router.post('/login', authController.login);

router.get('/user/dashboard', authController.dashboard);
router.post('/api/update/publicKey', authController.updatePublicKey);

router.post('/api/otp/send', authController.sendOtp);

router.post('/api/otp/verify', authController.verifyOtp);

router.post('/api/block/details', authController.getBlockDetails);

router.post('/api/block/verify', authController.verifyBlockDetails);

module.exports = router;
