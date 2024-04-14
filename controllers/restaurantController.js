const Restaurant = require("../models/restaurant");

module.exports = {
  // -> Function To add Restaurant
  addRestaurant: async (req, res) => {
    const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;
    if (
      !title ||
      !time ||
      !imageUrl ||
      !owner ||
      !code ||
      !logoUrl ||
      !coords ||
      !coords.latitude ||
      !coords.longitude ||
      !coords.title ||
      !coords.address
    ) {
      return res
        .status(400)
        .json({ status: false, massage: " All Fields are required! " });
    }
    try {
      const newRestaurant = new Restaurant(req.body);
      await newRestaurant.save();
      res
        .status(201)
        .json({ status: true, massage: "Restaurant Created Successfully" });
    } catch (error) {
      return res.status(400).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get Restaurant By Id
  getRestaurantById: async (req, res) => {
    const id = req.params.id;

    try {
      const restaurant = await Restaurant.findById(id);
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get Random Restaurant
  getRandomRestaurants: async (req, res) => {
    const code = req.params.code;
    try {
      let randomRestaurants = [];

      if (code) {
        randomRestaurants = await Restaurant.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }

      if (randomRestaurants.length === 0) {
        randomRestaurants = await Restaurant.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json(randomRestaurants);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },

  // -> Function To get All Nearby Restaurant
  getAllNearbyRestaurants: async (req, res) => {
    const code = req.params.code;
    try {
      let nearByRestaurants = [];

      if (code) {
        nearByRestaurants = await Restaurant.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $project: { __v: 0 } },
        ]);
      }

      if (nearByRestaurants.length === 0) {
        nearByRestaurants = await Restaurant.aggregate([
          { $match: { isAvailable: true } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json(nearByRestaurants);
    } catch (error) {
      res.status(500).json({ status: false, massage: error.massage });
    }
  },
};
