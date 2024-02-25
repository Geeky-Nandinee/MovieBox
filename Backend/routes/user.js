const express = require("express");
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword } = require("../controllers/user");
const { isValidPassResetToken } = require("../middlewares/user");
const { userValidtor, validate, validatePassword } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidtor, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword);

module.exports = router;





// router.get("/",(req,res) => {
//     res.send(<h1> hello I am from you backend server</h1>)
// })

// router.post('/create', userValidtor, validate,  create);
// module.exports = router;

// router.get
// sending data to our backend user
// router.post
// we will be gating some data from our frontend user
