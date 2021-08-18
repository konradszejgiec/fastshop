"use strict";

const items = (data) => {
  if (data == false) return;
  else return data;
};

const cartLength = async (data) => {
  const cartLength = await data.countDocuments();
  return cartLength;
};

exports.getShoppingCartContentMessage = async (data) => {
  return (await cartLength(data)) > 0 ? "Buy Now" : "Oops, your cart is empty. Please back and add some items.";
};

exports.getShoppingCartContentRoute = async (data) => {
  return (await cartLength(data)) > 0 ? "/shoppingcart/checkout" : "/";
};

exports.getSingleItemInfo = (req, data, message) => {
  let item, id, price, quantity, totalItemPrice;
  items(data).forEach((element) => {
    if (req.params.id == element._id) {
      item = element.name;
      price = element.price;
      id = element.id;
      quantity = element.quantity;
      totalItemPrice = Number(element.quantity) * Number(element.price);
    }
  });
  return message == "item"
    ? item
    : message == "price"
    ? price
    : message == "id"
    ? id
    : message == "quantity"
    ? quantity
    : message == "totalItemPrice"
    ? totalItemPrice
    : "";
};

exports.getCheckoutContentMessage = async (data) => {
  return (await cartLength(data)) > 0
    ? `Thank you for shopping! Your shopping cart has now ${await cartLength(data)} items.`
    : `Thank you for shopping! Your shopping cart is now empty.`;
};
