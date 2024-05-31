const router = require("express").Router();

const foodsController = require("../controllers/foodController");

router.post("/", foodsController.addFood);

router.get("/:id", foodsController.getFoodById);

router.get("/random/:code", foodsController.getFoodByCode);

router.get("/search/:search", foodsController.searchFoods);

router.get("/:category/:code", foodsController.getFoodByCategoryAndCode);

router.get("/restaurant-food/:id", foodsController.getFoodByRestaurant);

router.get("/recommendation/:code", foodsController.getRandomFoods);

module.exports = router;
