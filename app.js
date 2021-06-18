const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const shoppingCart = require("./routes/shoppingcart");
const port = 3000;

app.listen(port, () => {
  console.log("Server is running");
});

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");

shoppingCart(app, fs, bodyParser, path);
