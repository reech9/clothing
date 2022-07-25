const Review = require("../models/reviewModel");

// create review
const addReview = (req, res) => {
  const productId = req.body.productId;
  const reviewText = req.body.reviewText;
  const reviewDate = req.body.reviewDate;

  const data = new Review({
    userId: req.customerData._id,
    productId,
    reviewText,
    reviewDate,
  });

  data
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => res.json({ message: `${err.message}` }));
};

//update review
const updateReview = (req, res) => {
  const id = req.params.id;

  console.log(id);

  Review.findOne({ userId: req.customerData._id._id })
    .then((data) => {
      if (data === null) {
        res.send({ message: "You have no access to review." });
        return;
      }

      Review.findByIdAndUpdate(id, req.body)
        .then((data) => {
          console.log(data);
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

    Review.findByIdAndDelete(id);
  });
};

module.exports = { addReview, updateReview };
