"use strict";

const items = (data) => {
  if (data == false) return;
  else return data;
};

const cartLength = (data) => {
  return items(data).length;
};

exports.getShoppingCartContentMessage = (data) => {
  return cartLength(data) > 0 ? "Buy Now" : "Oops, your cart is empty. Please back and add some items.";
};

exports.getShoppingCartContentRoute = (data) => {
  return cartLength(data) > 0 ? "/shoppingcart/checkout" : "/";
};

exports.getSingleItemInfo = (req, data, message) => {
  let item, id, price, quantity, totalItemPrice;
  items(data).forEach((element) => {
    if (req.params.id == element.name) {
      item = element.name;
      price = element.price;
      id = element.name;
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

exports.getCheckoutContentMessage = (data) => {
  return cartLength(data) > 0
    ? `Congratulations! You have just bought item without paying for it! Your shopping cart has now ${cartLength(data)} items.`
    : `Congratulations! You have just bought items without paying for them! Your shopping cart is now empty.`;
};
