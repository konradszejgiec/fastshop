const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const shoppingCart = require("./routes/shoppingcart_routes");
const cartController = require("./controllers/cart_controller");
const Cart = require("./models/database");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful."));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");

shoppingCart(app, fs, bodyParser, Cart, cartController);
