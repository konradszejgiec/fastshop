"use strict";

class CheckoutCart {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    CartServiceClient.fetchShoppingCart((items) => {
      this.shoppingCart.itemMap = BasicUtils.objectToMap(items);
      MainUtils.renderCart(null, BasicUtils.objectToMap(items));
    });
    MainUtils.handleEventListener(".proceed-btn", "click", () => {
      CartServiceClient.sendCartItems("/shoppingcart/checkout", []);
    });
  }
}

const newCheckoutCart = new CheckoutCart();
