const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Authority = require('../models/authorityModel');
const Verifier = require('../models/verifierModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const axios = require('axios');
const MSG91_TEMPLATE_ID = '5e2d1ba3d6fc056bb171f154';
const MSG91_AUTHKEY = '249056AXhkLvxnnI5e2d273dP1';
const MSG91_SEND_OTP_BASE_URL = 'https://api.msg91.com/api/v5/otp?';
const MSG91_VERIFY_OTP_BASE_URL = 'https://api.msg91.com/api/v5/otp/verify?';
var sess;
// const sendEmail = require('./../utils/email');

// const signToken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true
//   };
//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('jwt', token, cookieOptions);
//   // Remove password from output
//   user.password = undefined;

//   // res.status(statusCode).json({
//   //   status: 'success',
//   //   token,
//   //   data: {
//   //     user
//   //   }
//   // });

//   //res.render('/login');
// };


// 
exports.updatePublicKey = catchAsync(async (req, res, next) => {

  User.findOneAndUpdate({
    _id: req.body.userId
  },
    {
      block_id: req.body.publicKey
    }, (error, updatedUser) => {
      if (error) {
        console.log("error");
      } else {
        //createSendToken(updatedUser, 201, res);
        res.redirect('/user/dashboard');
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

exports.userRegister = catchAsync(async (req, res, next) => {
  const { authId, data } = req.body;
  let user = {
    name: data[0].name,
    email: data[0].phone,
    password: data[0].name + data[0].phone

  }
  const newUser = await User.create(user);

  const resp = await axios.post(`http://localhost:3002/api/mine`, {
    userId: newUser.id,
    authId,
    data
  });

  return res.json(resp.data);

});

exports.authSignup = catchAsync(async (req, res, next) => {
  let authority = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    auth_id: req.body.auth_id
  }

  const newAuthority = await Authority.create(authority);

  //createSendToken(newAuthority, 201, res);
  res.redirect('/login');

});

exports.verSignup = catchAsync(async (req, res, next) => {
  let verifier = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    ver_id: req.body.ver_id
  }

  const newVerifier = await Verifier.create(verifier);

  //createSendToken(newVerifier, 201, res);
  res.redirect('/login');

});


exports.dashboard = catchAsync(async (req, res, next) => {
  const userId = req.session.userId;
  User.findOne({ 
  _id: userId }, async function(err, user) {
    if(err) {
      console.log(err);
    } else {
      if(user)
      var referenceNo = user.block_id;
      var idData = await axios(`http://localhost:3002/api/block/${referenceNo}`);
      res.render('userDetails', { idData: idData.data.data, referenceNo });
    } 
  });
});

exports.postDashboard = catchAsync(async (req, res, next) => {
  console.log(req.session.userId)
});

exports.updateForm = catchAsync(async (req, res, next) => {
  res.render('updateForm');
});

exports.updateAddBlock = catchAsync(async (req, res, next) => {
  const { type, authId, referenceNo, name, phone, email } = req.body;
  const resp = await axios.post(`http://localhost:3002/api/update`, {
    authId: authId,
    referenceNo: referenceNo,
    update: {
      type: type,
      dataUpdation: {
        name: name,
        phone: phone,
        email: email
      }
    }
  });

  return res.redirect('/dashboard/authority');
});


exports.login = catchAsync(async (req, res, next) => {
  if (req.body.role === 'user') {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    req.session.userId = user.id;
    req.session.type = "user";
    res.redirect('/user/dashboard');
    //createSendToken(user, 200, res);
  }

  if (req.body.role === 'authority') {

    const { auth_id, password } = req.body;


    const authority = await Authority.findOne({ auth_id }).select('+password');

    if (!authority || !(await authority.correctPassword(password, authority.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    req.session.userId = authority.id;
    req.session.type = "authority";
    res.redirect('/dashboard/authority');
    //createSendToken(user, 200, res);
  }

  if (req.body.role === 'verifier') {
    const { ver_id, password } = req.body;


    const verifier = await Verifier.findOne({ ver_id }).select('+password');

    if (!verifier || !(await verifier.correctPassword(password, verifier.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    req.session.userId = verifier.id;
    req.session.type = "verifier";
    res.redirect('/dashboard/verifier');
    //createSendToken(user, 200, res);
  }

});

exports.sendOtp = catchAsync(async (req, res, next) => {
  const phone = req.body.phone;
  const templateId = MSG91_TEMPLATE_ID;
  const authKey = MSG91_AUTHKEY;
  const queryParams = `authkey=${authKey}&template_id=${templateId}&mobile=${phone}&extra_param=`;
  const SEND_URL = `${MSG91_SEND_OTP_BASE_URL}${queryParams}`;
  const resp = await axios.get(SEND_URL);
  if (resp.data.type === "success") {
    return res.json({ status: 200, message: "OTP send successfully" });
  } else {
    return res.json({ status: 500, message: "Error in OTP send" });
  }
});


exports.verifyOtp = catchAsync(async (req, res, next) => {
  const { phone, otp } = req.body;
  const authKey = MSG91_AUTHKEY;
  const queryParams = `authkey=${authKey}&mobile=${phone}&otp=${otp}`;
  const VERIFY_URL = `${MSG91_VERIFY_OTP_BASE_URL}${queryParams}`;
  const resp = await axios.post(VERIFY_URL);
  if (resp.data.type === "success") {
    return res.json({ status: 200, message: "OTP verification successfully" });
  } else {
    return res.json({ status: 500, message: "Error in OTP verify" });
  }
});


exports.getBlockDetails = catchAsync(async (req, res, next) => {
  const { referenceNo, id, type } = req.body;
  const resp = await axios.post(`http://localhost:3002/api/block/basic/${referenceNo}`, {
    type
  });
  const resp_verify = await axios.post(`http://localhost:3002/api/verify`, {
    data: {
      referenceNo,
      id,
      type
    }
  });
  return res.json(resp.data);

});

exports.verifyBlockDetails = catchAsync(async (req, res, next) => {
  const { referenceNo, id, type } = req.body;
  const resp = await axios.post(`http://localhost:3002/api/verify`, {
    data: {
      referenceNo,
      id,
      type
    }
  });
  return res.json(resp.data)

});
