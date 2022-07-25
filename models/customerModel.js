const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  dob: {
    type: Date,
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
