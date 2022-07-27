const express = require("express");
const router = new express.Router();
const { customerGuard } = require("../auth/auth");

const {
  addReview,
  updateReview,
  getReviewByProductId,
  deleteReview,
} = require("../controller/reviewController");

router.get("/get/review/:id", getReviewByProductId);
router.post("/review/givereview", customerGuard, addReview);
router.put("/review/update/:id", customerGuard, updateReview);
router.delete("/review/delete/:id", customerGuard, deleteReview);

module.exports = router;
