const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  foodTags: { type: Array, required: true },
  foodType: { type: Array, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: Array, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, min: 1, max: 5, default: 3 },
  ratingCount: { type: String, default: "245" },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  additives: { type: Array, default: [] },
});

module.exports = mongoose.model("Food", foodSchema);
