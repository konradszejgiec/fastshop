const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const basketRoots = require("./routes/basket");
const port = 3000;

app.listen(port, () => {
  console.log("Server is running");
});

app.use(express.static(`${__dirname}/public`));

basketRoots(app, fs, bodyParser);
