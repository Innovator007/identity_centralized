const express = require('express');
//const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Sign Up Routers
///User
// router.get('/user', (req, res, next) => {
//     res.render('userSignupForm');
// });
// router.post('/user', authController.userSignup);

//Authority

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
router.post('/signup/verifier', authController.verSignup);

//Login
router.get('/login', (req, res, next) => {
    res.render('login');
});
router.post('/login', authController.login);

router.get('/dashboard', authController.dashboard);
router.post('/api/update/publicKey', authController.updatePublicKey);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// router.patch(
//   '/updateMyPassword',
//   authController.protect,
//   authController.updatePassword
// );

// router.patch('/updateMe', authController.protect, userController.updateMe);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
