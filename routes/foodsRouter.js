const router = require("express").Router();
const { verifyVendor } = require("../middleware/verify_token");
const foodsController = require("../controllers/foodController");

router.post("/", verifyVendor, foodsController.addFood);

router.get("/:id", foodsController.getFoodById);

router.get("/random/:code", foodsController.getFoodByCode);

router.get("/search/:search", foodsController.searchFoods);

router.get("/:category/:code", foodsController.getFoodByCategoryAndCode);

router.get("/restaurant-food/:id", foodsController.getFoodByRestaurant);

router.get("/recommendation/:code", foodsController.getRandomFoods);

module.exports = router;
