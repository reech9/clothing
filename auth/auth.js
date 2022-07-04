const jwt = require("jsonwebtoken");
const customer = require("../models/customerModel");

// creating function
// which works as a mediator

module.exports.customerGuard = (req, res, next) => {
  try {
    // token receive
    const token = req.headers.authorization.split(" ")[1];
    // token verification
    // the logged in user id is avaikable in data variable below
    const data = jwt.verify(token, "everest");
    console.log(data);

    // check on database
    customer
      .findOne({ _id: data.customer_id })
      .then((result) => {
        console.log(result);
        req.customerData = result;
        next();
      })
      .catch((e) => {
        res.json({
          msg: "Invalid Token",
        });
      });
  } catch (e) {
    res.json({ msg: "invalid access" });
  }
  // console.log(data);
  // console.log(token);
};
