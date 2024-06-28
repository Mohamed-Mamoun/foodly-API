const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  addressLine1: { type: String, required: true },
  postalCode: { type: String, required: true },
  default: { type: Boolean, default: false },
  deliveryInstruction: { type: String, required: false },
  phone: { type: String, default: "0123456789" },
  phoneVerfication: { type: Boolean, default: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

module.exports = mongoose.model("Address", AddressSchema);
