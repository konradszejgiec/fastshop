const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const shoppingCart = require("./routes/shoppingcart_routes");
const cartController = require("./controllers/cart_controller");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  -process.env.DATABASE_PASSWORD
);

(async function connectToDB() {
  await mongoose
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
})();

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");

shoppingCart(app, bodyParser, cartController);
