const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  productId: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "Customer" },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  productData: { type: Object, required: true },
});

module.exports = mongoose.model("Cart", Cart);
