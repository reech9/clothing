const express = require("express");

const app = express();
app.use(express.json())

require("./connection/connection");

const customerRoute= require("./routers/customerRouter");
app.use(customerRoute);

app.listen(90);