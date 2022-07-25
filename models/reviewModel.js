const mongoose = require("mongoose");

const Review = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Customer",
  },

  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Product",
  },

  reviewText: {
    type: String,
    required: true,
  },

  reviewDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Review", Review);
