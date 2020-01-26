const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Authority = require('../models/authorityModel');
const Verifier = require('../models/verifierModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
// const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  // res.status(statusCode).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user
  //   }
  // });

  //res.render('/login');
};


// 
exports.updatePublicKey = catchAsync(async (req, res, next) => {
  console.log(req.body);
  User.findOneAndUpdate({
    _id: req.body.userId
  },
  {
    block_id: req.body.publicKey
  }, (error, updatedUser) => {
    if(error) {
      console.log("error");
    } else {
      createSendToken(updatedUser, 201, res);
    }
  })

});

exports.signupSelect = catchAsync(async (req, res, next) => {
  let { role } = req.body;
  let redirectSignup = {
    authority: '/signup/authority',
    verifier: '/signup/verifier'
  };
  res.redirect(redirectSignup[role]);
});

exports.userSignup = catchAsync(async (req, res, next) => {
  
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  }
  const newUser = await User.create(user);
  
  createSendToken(newUser, 201, res);
  res.redirect('/login');
});

exports.authSignup = catchAsync(async (req, res, next) => {
  let authority = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    auth_id : req.body.auth_id
  }

  const newAuthority = await Authority.create(authority);

  createSendToken(newAuthority, 201, res);
  res.redirect('/login');

});

exports.verSignup = catchAsync(async (req, res, next) => {
  let verifier = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    ver_id : req.body.ver_id
  }

  const newVerifier = await Verifier.create(verifier);

  createSendToken(newVerifier, 201, res);
  res.redirect('/login');

});


exports.dashboard = catchAsync(async (req, res, next) => {
  res.render("dashboard.ejs");
});


exports.login = catchAsync(async (req, res, next) => {
  
  if(req.body.role === 'user')
  {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // 3) If everything ok, send token to client
    res.redirect('/dashboard');
    //createSendToken(user, 200, res);
  }

  if(req.body.role === 'authority'){

    const { auth_id, password } = req.body;

    
    const authority = await Authority.findOne({ auth_id }).select('+password');

    if (!authority || !(await authority.correctPassword(password, authority.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    res.redirect('/dashboard/authority');
    //createSendToken(user, 200, res);
  }

  if(req.body.role === 'verifier'){
    const { ver_id, password } = req.body;

    
    const verifier = await Verifier.findOne({ ver_id }).select('+password');

    if (!verifier || !(await verifier.correctPassword(password, verifier.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    res.redirect('/dashboard');
    //createSendToken(user, 200, res);
  }
  
});


// exports.updatePassword = catchAsync(async (req, res, next) => {
//   // 1) Get user from collection
//   const user = await User.findById(req.user.id).select('+password');

//   // 2) Check if POSTed current password is correct
//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(new AppError('Your current password is wrong.', 401));
//   }

//   // 3) If so, update password
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();
//   // User.findByIdAndUpdate will NOT work as intended!

//   // 4) Log user in, send JWT
//   createSendToken(user, 200, res);
// });
