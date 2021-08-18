"use strict";

(function showItemSpecification() {
  const shoppingCart = new ShoppingCart();
  fetchShoppingCart("/shoppingcart/items.json", (items) => {
    shoppingCart.itemMap = arrayToMap(items);
  });
  handleEventListener(".buy-btn", "click", () => {
    deleteCartItem(getRoute(shoppingCart), getItemId(shoppingCart));
  });

  function getRoute(cartItem) {
    return `/shoppingcart/items/${getItemId(cartItem)}`;
  }
})();
