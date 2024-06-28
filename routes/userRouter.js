const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);

router.delete("/", authController.delete);

router.get("/verify/:otp", userController.verifyPhone);

router.get("/verify_phone/:phone", userController.verifyPhone);

module.exports = router;
