const express = require("express");
const { customerGuard } = require("../auth/auth");
const router = new express.Router();
const upload = require("../fileupload/fileupload");

const {
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getProductCategory,
} = require("../controller/productController");

router.get("/get/product", getProduct);
router.get("/get/product/category=:category", getProductCategory);

router.post("/product/add", customerGuard, upload.single("img"), addProduct);
router.put("/product/update", customerGuard, updateProduct);

router.delete("/product/remove/:id", customerGuard, deleteProduct);

module.exports = router;
