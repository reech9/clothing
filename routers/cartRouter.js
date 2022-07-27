const express = require("express");
const router = new express.Router();

const { customerGuard } = require("../auth/auth");
const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
  getCartById,
} = require("../controller/cartController");

router.get("/get/cart/:id", customerGuard, getCartById);
router.get("/get/cart", customerGuard, getCart);
router.post("/cart/add", customerGuard, addCart);
router.put("/update/cart/:id", customerGuard, updateCart);
router.delete("/delete/cart/:id", customerGuard, deleteCart);

module.exports = router;
