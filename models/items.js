const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name of the item."],
    unique: true,
    bufferCommands: false,
    autoCreate: false,
  },
  price: {
    type: String,
    required: [true, "Please fill the price of the item."],
    bufferCommands: false,
    autoCreate: false,
  },
  description: {
    type: String,
    required: [true, "Please fill the description of the item."],
    bufferCommands: false,
    autoCreate: false,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
