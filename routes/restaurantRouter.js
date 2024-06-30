const router = require("express").Router();
const restaurantController = require("../controllers/restaurantController");
const { verifyVendor } = require("../middleware/verify_token");

router.post("/", verifyVendor, restaurantController.addRestaurant);

router.get("/:code", restaurantController.getRandomRestaurants);

router.get("/all/:code", restaurantController.getAllNearbyRestaurants);

router.get("/byId/:id", restaurantController.getRestaurantById);

module.exports = router;
