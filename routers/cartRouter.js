const express = require("express");
const { customerGuard } = require("../auth/auth");
const router = new express.Router();

const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
} = require("../controller/cartController");

router.get("/get/cart", customerGuard, getCart);
router.post("/add/cart", customerGuard, addCart);
router.put("/updatecart/:id", customerGuard, updateCart);
router.delete("/deletecart/:id", customerGuard, deleteCart);

module.exports = router;
