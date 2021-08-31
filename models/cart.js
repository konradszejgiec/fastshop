const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the item."],
    unique: true,
    bufferCommands: false,
    autoCreate: false,
  },
  quantity: {
    type: Number,
    required: [true, "Please fill the quantity of the item."],
    bufferCommands: false,
    autoCreate: false,
  },
  price: {
    type: Number,
    required: [true, "Please fill the price of the item."],
    bufferCommands: false,
    autoCreate: false,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
