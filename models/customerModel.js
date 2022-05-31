const mongoose = require("mongoose");

const Customer= new mongoose.Schema({
    fn:{
        type: String
    },
    ln:{
        type:  String
    },
    age:{
        type: Number
    },
    dob:{
        type:Date
    },
    password:{
        type: String,
        required: true     
    },
    email:{
        type: String,
        required: true
    },
    picture: {
        type: String
    },

    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customer"
    }


})

module.exports = mongoose.model('Customer', Customer);