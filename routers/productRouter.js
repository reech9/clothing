const express = require("express");
const { customerGuard } = require("../auth/auth");
const router = new express.Router();
const upload = require("../fileupload/fileupload");

const {
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} = require("../controller/productController");

router.post("/product/add", customerGuard, upload.single("img"), addProduct);
router.put("/product/update", customerGuard, updateProduct);
// router.get("/getproducts ", getProduct);

router.get("/products", getProduct);

router.delete("/product/remove/:id", customerGuard, deleteProduct);

module.exports = router;
