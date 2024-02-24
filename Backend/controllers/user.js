const nodemailer = require('nodemailer')
const User = require('../models/user')
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');

exports.create = async (req, res) => {
  const { name, email, password } = req.body

  const oldUser = await User.findOne({ email });

  if (oldUser) return res.status(401).json({ error: "This email is already in use!" });

  const newUser = new User({ name, email, password })
  await newUser.save()

  // generate 6 digit otp
  let OTP = "";
  for (let i = 1; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  // store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({ owner: newUser._id, token: OTP })

  await newEmailVerificationToken.save()

  // send that otp to our user

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f39b17646fe9dd",
      pass: "30360a198facac"
    }
  });

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `
      <p>You verification OTP</p>
      <h1>${OTP}</h1>
    `
  })

  res.status(201).json({ message: 'Please verify you email. OTP has been sent to your email account!' })
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" })

  const user = await User.findById(userId)
  if (!user) return res.json({ error: "user not found!" })

  if (user.isVerified) return res.json({ error: "user is already verified!" })

  const token = await EmailVerificationToken.findOne({ owner: userId })
  if (!token) return res.json({ error: 'token not found!' })

  const isMatched = await token.compareToken(OTP)
  if (!isMatched) return res.json({ error: 'Please submit a valid OTP!' })

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f39b17646fe9dd",
      pass: "30360a198facac"
    }
  });

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Welcome Email',
    html: '<h1>Welcome to our app and thanks for choosing us.</h1>'
  })

  res.json({ message: "Your email is verified." })
}

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "user not found!" });

  if (user.isVerified)
    return res.json({ error: "This email id is already verified!" });

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken)
    return res.json({ error: "Only after one hour you can request for another token!" });

  // generate 6 digit otp
  let OTP = "";
  for (let i = 1; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  // store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({ owner: user._id, token: OTP })

  await newEmailVerificationToken.save()

  // send that otp to our user

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f39b17646fe9dd",
      pass: "30360a198facac"
    }
  });

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
      <p>You verification OTP</p>
      <h1>${OTP}</h1>
    `
  })

  res.json({
    message: "New OTP has been sent to your registered email accout.",
  });
};
