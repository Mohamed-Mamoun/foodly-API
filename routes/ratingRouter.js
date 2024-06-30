const router = require("express").Router();
const ratingController = require("../controllers/ratingController");
const { verifyTokenAndAuthorization } = require("../middleware/verify_token");

router.post("/", verifyTokenAndAuthorization, ratingController.addRating);

router.get("/", verifyTokenAndAuthorization, ratingController.checkUserRating);

module.exports = router;
