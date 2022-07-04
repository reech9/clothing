const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  brandName: { type: String, required: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  rentPrice: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  rentCategory: { type: String, required: true },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Customer",
  },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Product", Product);
