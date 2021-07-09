"use strict";

const shoppingCart = (app, fs, bodyParser, Cart, cartController) => {
  const jsonParser = bodyParser.json();
  app.route("/").get(cartController.displayMainPage);
  app.route("/show").get(cartController.renderCartItems);
  app.route("/shoppingcart").get(cartController.displayShoppingCartContent).post(jsonParser, cartController.postClientData);
  app.route("/shoppingcart.json").get(cartController.renderCartItems);
  app.route("/shoppingcart/items/:id").get(cartController.displaySingleItemContent).post(jsonParser, cartController.postClientData);
  app.route("/shoppingcart/items.json").get(cartController.renderCartItems);
  app.route("/shoppingcart/checkout").get(cartController.displayCheckoutContent).post(jsonParser, cartController.postClientData);
};

module.exports = shoppingCart;
