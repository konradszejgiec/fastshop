const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the item."],
    unique: true,
  },
  quantity: {
    type: Number,
    required: [true, "Please fill the quantity of the item."],
  },
  price: {
    type: Number,
    required: [true, "Please fill the price of the item."],
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
