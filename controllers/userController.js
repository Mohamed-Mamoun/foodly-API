const User = require("../models/user");

module.exports = {
  // -> Function To get user data
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const { password, _v, createdAt, ...userData } = user._doc;

      res.status(200).json(...userData);
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },

  // -> Function To verify user account
  verifyAccount: async (req, res) => {
    const userOtp = req.params.otp;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(400).json({ status: false, message: "User not found" });
      }

      if (userOtp === user.otp) {
        user.verfication = true;
        user.otp = "none";

        await user.save();

        const { password, _v, createdAt, ...others } = user._doc;
        res.status(200).json({ ...others });
      } else {
        res
          .status(400)
          .json({ status: false, message: "otp verification failed" });
      }
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },

  // -> Function To verify user phone number
  verifyPhone: async (req, res) => {
    const phone = req.params.phone;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(400).json({ status: false, message: "User not found" });
      }

      user.phoneVerfication = true;
      user.phone = phone;

      await user.save();

      const { password, _v, createdAt, ...others } = user._doc;
      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },

  // -> Function To delete user
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);

      res
        .status(200)
        .json({ status: true, message: "User Successfully deleted" });
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },
};
