const express = require("express");

const app = express();
const path = require("path");

app.use(express.json());
// app.use(express.urlencoded()); // Accepting form data

require("./connection/connection");

app.use("/upload", express.static(path.join(__dirname, "/upload")));

const customerRoute = require("./routers/customerRouter");
const productRoute = require("./routers/productRouter");
const reviewRoute = require("./routers/reviewRouter");
const cartRoute = require("./routers/cartRouter");

app.use(customerRoute);
app.use(productRoute);
app.use(reviewRoute);
app.use(cartRoute);

app.listen(90);
