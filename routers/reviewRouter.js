const express = require("express");
const router = new express.Router();
const { customerGuard } = require("../auth/auth");

const {
  addReview,
  updateReview,
  getReviewByProductId,
} = require("../controller/reviewController");

router.get("/get/review/:id", getReviewByProductId);
router.post("/review/givereview", customerGuard, addReview);
router.put("/review/update/:id", customerGuard, updateReview);

module.exports = router;
