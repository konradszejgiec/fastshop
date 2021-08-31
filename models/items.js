const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the item."],
    unique: true,
  },
  price: {
    type: String,
    required: [true, "Please fill the price of the item."],
  },
  description: {
    type: String,
    required: [true, "Please fill the description of the item."],
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
