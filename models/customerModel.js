const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // picture: {
  //   type: String,
  // },
});

module.exports = mongoose.model("Customer", Customer);
