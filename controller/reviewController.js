const Review = require("../models/reviewModel");
const Customer = require("../models/customerModel");

// create review
const addReview = (req, res) => {
  const productId = req.body.productId;
  const reviewText = req.body.reviewText;

  let customerFullName = "";

  Customer.findById(req.customerData._id)
    .then((data) => {
      customerFullName = `${data.firstName} ${data.lastName}`;

      const reviewData = new Review({
        userId: req.customerData._id,
        productId,
        reviewText,
        authorName: customerFullName,
        reviewDate: new Date().toISOString(),
      });

      reviewData
        .save()
        .then((data) => {
          res.json({ data });
        })
        .catch((err) =>
          res.json({ message: `${err.message}`, stack: err.stack })
        );
    })
    .catch((err) => {
      console.log(err);
    });
};

//update review
const updateReview = (req, res) => {
  const id = req.params.id;

  Review.findOne({ userId: req.customerData._id._id })
    .then((data) => {
      if (data === null) {
        res.send({ message: "You have no access to review." });
        return;
      }

      Review.findByIdAndUpdate(id, req.body)
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          res.json({ message: `${err.message}` });
        });
    })
    .catch((err) => {
      res.json({ message: `${err.message}` });
    });
};

// delete review
const deleteReview = (req, res) => {
  const id = req.params.id;

  Review.deleteOne({ userId: req.customerData._id }).then((data) => {
    if (data === null) {
      res.send({ message: "Try Again" });
      return;
    }

    Review.findByIdAndDelete(id)
      .then((res) => {
        res.send(res);
      })
      .catch((err) => res.send(err));
  });
};

const getReviewByProductId = async (req, res) => {
  const { id } = req.params;

  const review = await Review.find({ productId: id });
  res.json({ review });
};

module.exports = {
  addReview,
  updateReview,
  getReviewByProductId,
  deleteReview,
};
