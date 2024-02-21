const nodemailer = require('nodemailer')
const User =  require('../models/user');
const EmailVerificationToken =  require('../models/emailVerificationToken');

exports.create = async(req, res) => {
    // console.log(req.body);
    const {name,email,password} = req.body;

    const oldUser =await User.findOne({email });
    if (oldUser)
    return res.status(401).json({ error: "This email is already in use!"}
    );
    /*if email is exit 
    return console.log(oldUser);*/

    // Thos method is just created new user
    const newUser = new User({name,email,password});
    await newUser.save();

    // geberate 6 digit otp
    let OTP = '';
    for (let i = 0; i <=5; i++){
        const randomval = Math.round(Math.random() *9)
        OTP += randomval;
    }

    //store otp inside our db
    const newEmailVerificationToken = new EmailVerificationToken(
        {owner: newUser._id, 
        token:OTP,
    })
    await newEmailVerificationToken.save()

    //send thai otp to our user

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f39b17646fe9dd",
          pass: "30360a198facac"
        }
      });

      transport.sendMail({
        from: 'verification@reviewapp.com',
        to : newUser.email,
        subject: 'Email verification',
        html:`
            <p>Ypur verification OTP</p>
            <h1>${OTP}</h1>
            `
      });


    /*res.send('I will create later');
    res.json({ user: newUser});*/
    res.status(201).json({ 
        message: "Please verify your email. OTP has been sent to your email account!", 
    });
};
