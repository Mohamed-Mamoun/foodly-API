const User = require("../models/user");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");
const sendEmail = require("../utils/email_ver");

module.exports = {
  // -> Function To Register New User
  createUser: async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ status: false, messege: "invalid Email" });
    }

    if (req.body.password < 8) {
      return res.status(400).json({
        status: false,
        messege: "Password should be at least 8 characters",
      });
    }

    try {
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {
        return res
          .status(400)
          .json({ status: false, messege: "Email Already Exisits" });
      }

      // Generate otp
      const otp = generateOtp();

      // create user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        userType: "Client",
        password: CryptoJs.AES.encrypt(
          req.body.password,
          process.env.SECRETKEY
        ).toString(),
        otp: otp,
      });

      // save user to DB
      await newUser.save();

      // send otp to user
      await sendEmail(newUser.email, otp);

      res
        .status(201)
        .json({ status: true, messege: "User Successfully Created" });
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },

  // -> Function To Signin User
  loginUser: async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ status: false, messege: "invalid Email" });
    }

    if (req.body.password < 8) {
      return res.status(400).json({
        status: false,
        messege: "Password should be at least 8 characters",
      });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(400)
          .json({ status: false, messege: "User not found" });
      }
      // -> Check Password
      const decreptedPass = CryptoJs.decrypt(
        req.body.password,
        process.env.SECRETKEY
      );
      const decreptedPassSTR = decreptedPass.toString(CryptoJs.enc.Utf8);

      if (decreptedPassSTR !== req.body.password) {
        return res
          .status(400)
          .json({ status: false, messege: "Wrong Password" });
      }
      // -> Create User Token
      const userToken = jwt.sign(
        {
          id: user._id,
          userType: user.userType,
          email: user.email,
        },
        process.env.JWTSECRET,
        { expiresIn: "21d" }
      );

      const { password, otp, ...others } = user.doc;

      res.status(200).json({ ...others, userToken });
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },
};
