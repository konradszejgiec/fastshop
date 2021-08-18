"use strict";

const { deleteItem } = require("../controllers/cart_controller");

const shoppingCart = (app, bodyParser, cartController) => {
  const jsonParser = bodyParser.json();

  app.route("/").get(cartController.displayMainPage);

  app.route("/show").get(cartController.renderCartItems);

  app
    .route("/shoppingcart")
    .get(cartController.displayShoppingCartContent)
    .post(jsonParser, cartController.postClientData)
    .patch(jsonParser, cartController.updateItem)
    .delete(jsonParser, cartController.deleteItem);

  app.route("/shoppingcart.json").get(cartController.renderCartItems);

  app
    .route("/shoppingcart/items/:id")
    .get(cartController.displaySingleItemContent)
    .post(jsonParser, cartController.postClientData)
    .delete(jsonParser, deleteItem);

  app.route("/shoppingcart/items.json").get(cartController.renderCartItems);

  app.route("/shoppingcart/checkout").get(cartController.displayCheckoutContent).delete(jsonParser, cartController.clearCart);

  app.route("/clear").delete(jsonParser, cartController.clearCart);
};

module.exports = shoppingCart;
