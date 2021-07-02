const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const shoppingCartApi = require("./routes/shoppingcart_api");
const port = 3000;

app.listen(port, () => {
  console.log("Server is running");
});

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");

shoppingCartApi(app, fs, bodyParser);
