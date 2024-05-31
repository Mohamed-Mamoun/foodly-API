const Rating = require("../models/rating");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");

module.exports = {
  // ->  Function To Add Rating
  addRating: async (req, res) => {
    const newRating = new Rating({
      userId: req.body.userId,
      ratingType: req.body.ratingType,
      product: req.body.product,
      rating: req.body.rating,
    });

    try {
      //
      await newRating.save();
      if (req.body.ratingType === "Restuarant") {
        const restaurants = await Rating.aggregate([
          {
            $match: {
              ratingType: req.body.ratingType,
              product: req.body.product,
            },
          },
          { $group: { _id: "$product" }, averageRating: { $avg: "$rating" } },
        ]);

        if (restaurants.length > 0) {
          var averageRating = restaurants[0].averageRating;
          await Restaurant.findByIdAndUpdate(req.body.product, {
            rating: averageRating,
          });
        }
      } else if (req.body.ratingType === "Food") {
        const foods = await Rating.aggregate([
          {
            $match: {
              ratingType: req.body.ratingType,
              product: req.body.product,
            },
          },
          { $group: { _id: "$product" }, averageRating: { $avg: "$rating" } },
        ]);

        if (foods.length > 0) {
          var averageRating = foods[0].averageRating;
          await Food.findByIdAndUpdate(req.body.product, {
            rating: averageRating,
          });
        }
      }

      res
        .status(200)
        .json({ status: true, messege: "Rating updated successfully" });
      //
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },

  // -> Function To Check User Rating
  checkUserRating: async (req, res) => {
    const ratingType = req.query.ratingType;
    const product = req.query.product;

    try {
      //
      const existingRating = await Rating.findOne({
        userId: req.user.id,
        ratingType: ratingType,
        product: product,
      });

      if (existingRating) {
        res.status(200).json({
          status: true,
          messege: "You have already rated this restaurent",
        });
      } else {
        res.status(200).json({ status: true, messege: "Rate this restaurent" });
      }
    } catch (error) {
      res.status(500).json({ status: false, messege: error.messege });
    }
  },
};
