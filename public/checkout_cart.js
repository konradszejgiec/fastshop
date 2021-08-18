"use strict";

(function checkoutCart() {
  const shoppingCart = new ShoppingCart();
  fetchShoppingCart("/shoppingcart.json", (items) => {
    shoppingCart.itemMap = arrayToMap(items);
    renderCart(null, arrayToMap(items));
  });
  handleEventListener(".proceed-btn", "click", () => {
    clearCart("/shoppingcart/checkout");
  });
})();
