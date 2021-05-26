const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const shoppingCart = require("./routes/shoppingcart");
const port = 3000;

app.listen(port, () => {
  console.log("Server is running");
});

app.use(express.static(`${__dirname}/public`));

shoppingCart(app, fs, bodyParser);
