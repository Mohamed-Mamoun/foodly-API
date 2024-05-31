const Food = require("../models/food");

module.exports = {
  // -> Function To add Food
  addFood: async (req, res) => {
    const {
      title,
      time,
      foodTags,
      category,
      code,
      imageUrl,
      restaurant,
      description,
      price,
    } = req.body;

    if (
      !title ||
      !time ||
      !foodTags ||
      !category ||
      !code ||
      !imageUrl ||
      !restaurant ||
      !description ||
      !price
    ) {
      return res
        .status(400)
        .json({ status: false, massage: "You have a missing field" });
    }

    try {
      const newFood = new Food(req.body);
      await newFood.save();
      res
        .status(201)
        .json({ status: true, massage: "Food created successfully" });
    } catch (error) {
      res.status(400).json({ status: false, massage: error.massage });
      console.log(error);
    }
  },

  // -> Function To get food by Id
  getFoodById: async (req, res) => {
    const id = req.params.id;

    try {
      const food = await Food.findById(id);
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get food by code
  getFoodByCode: async (req, res) => {
    const code = req.params.code;

    try {
      let foodList;
      if (code) {
        foodList = await Food.aggregate([
          { $match: { code: code, isAvailabe: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
        res.status(200).json(foodList);
      }

      if (foodList.length === 0) {
        foodList = await Food.aggregate([
          { $match: { isAvailabe: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
        res.status(200).json(foodList);
      }
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get food By Restaurant
  // -> Restaurant Menu
  getFoodByRestaurant: async (req, res) => {
    const id = req.params.id;

    try {
      const foods = await Food.find({ restaurant: id });
      res.status(200).json(foods);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get food By category & code
  getFoodByCategoryAndCode: async (req, res) => {
    const { category, code } = req.body;

    try {
      const foods = await Food.aggregate([
        { $match: { code: code, category: category, isAvailabe: true } },
        { $project: { __v: 0 } },
      ]);

      if (foods.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(foods);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get random Foods
  getRandomFoods: async (req, res) => {
    const { category, code } = req.body;

    try {
      //
      let foods;
      foods = await Food.aggregate([
        { $match: { code: code, category: category, isAvailabe: true } },
        { $sample: { size: 10 } },
      ]);

      if (!foods || foods === 0) {
        foods = await Food.aggregate([
          { $match: { code: code, isAvailabe: true } },
          { $sample: { size: 10 } },
        ]);
      } else if (!foods || foods === 0) {
        foods = await Food.aggregate([
          { $match: { isAvailabe: true } },
          { $sample: { size: 10 } },
        ]);
      }

      res.status(200).json(foods);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To Search For Foods
  searchFoods: async (req, res) => {
    const search = req.params.search;

    try {
      const result = await Food.aggregate([
        {
          $search: {
            index: "foods",
            text: {
              query: search,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      //
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },
};
