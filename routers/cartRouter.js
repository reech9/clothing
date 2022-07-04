const express = require("express");
const { customerGuard } = require("../auth/auth");
const router = new express.Router();

const {
  addCart,
  updateCart,
  deleteCart,
} = require("../controller/cartController");

router.post("/addcart", customerGuard, addCart);
router.put("/updatecart/:id", customerGuard, updateCart);
router.delete("/deletecart/:id", customerGuard, deleteCart);

module.exports = router;
