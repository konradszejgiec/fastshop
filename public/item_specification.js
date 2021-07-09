"use strict";

(function showItemSpecification() {
  const shoppingCart = new ShoppingCart();
  fetchShoppingCart("/shoppingcart/items.json", (items) => {
    shoppingCart.itemMap = arrayToMap(items);
    shoppingCart.itemMap = getNotBougthItems();
  });
  handleEventListener(".buy-btn", "click", () => {
    sendCartItems(getRoute(), shoppingCart.itemMap);
  });

  function getNotBougthItems() {
    let notBougthItems = new Map();
    shoppingCart.itemMap.forEach((item) => {
      if (getElementBy(".collection-item").id != item.name) notBougthItems.set(item.name, item);
    });
    return notBougthItems;
  }

  function getRoute() {
    let bougthItem = new Map();
    shoppingCart.itemMap.forEach((item) => {
      if (getElementBy(".collection-item").id == item.name) bougthItem.set(item.name, item);
    });
    return `/shoppingcart/items/${bougthItem.keys()}`;
  }
})();
