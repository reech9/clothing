const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/batch28_db", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})