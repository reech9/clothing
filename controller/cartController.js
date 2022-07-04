const { response } = require("express");
const Cart = require("../models/cartModel");

// get cart
const getCart = (req, res) => {
  Cart.find({ userId: req.customerData._id }, function (err, result) {
    //ony logged in user can add to cart
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

// add to cart
const addCart = (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const unitPrice = req.body.unitPrice;
  const totalPrice = +quantity * +unitPrice;

  const data = new Cart({
    productId,
    quantity,
    unitPrice,
    totalPrice,
    userId: req.customerData._id._id,
  });

  data
    .save()
    .then((data) => {
      //to handle promise then is required
      res.json({ data });
    })
    .catch((err) => {
      res.json({ message: `${err.message}` });
    });
};

//update cart
const updateCart = (req, res) => {
  // const quantity = req.body.quantity;

  Cart.findOne({ userId: req.customerData._id._id })
    .then((data) => {
      if (data === null) {
        res.send({ message: "You have no access to it" });
        return;
      }

      req.body.totalPrice = req.body.quantity * data.unitPrice;

      Cart.findByIdAndUpdate(
        // first cartid needs to be sent then at the same time the cart should be updated
        req.params.id,
        req.body
      )
        .then((data) => {
          res.json({ data });
        })
        .catch((err) => {
          res.json({ message: `${err.message}` });
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

// delete cart
const deleteCart = (req, res) => {
  const id = req.params.id;

  Cart.findOne({ userId: req.customerData._id._id })
    .then((data) => {
      if (data === null) {
        res.send({ message: "You have no access to it" });
        return;
      }

      Cart.findByIdAndDelete(id)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          response.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { addCart, getCart, updateCart, deleteCart };
