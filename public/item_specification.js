"use strict";

class ItemSpecification {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    CartServiceClient.fetchShoppingCart((items) => {
      this.shoppingCart.itemMap = BasicUtils.objectToMap(items);
      this.shoppingCart.itemMap = this.getNotBougthItems();
    });
    MainUtils.handleEventListener(".buy-btn", "click", () => {
      CartServiceClient.sendCartItems(this.getRoute(), this.shoppingCart.itemMap);
    });
  }

  getNotBougthItems() {
    let notBougthItems = new Map();
    this.shoppingCart.itemMap.forEach((item) => {
      if (BasicUtils.getElementBy(".collection-item").id != item.name) notBougthItems.set(item.name, item);
    });
    return notBougthItems;
  }

  getRoute() {
    let bougthItem = new Map();
    this.shoppingCart.itemMap.forEach((item) => {
      if (BasicUtils.getElementBy(".collection-item").id == item.name) bougthItem.set(item.name, item);
    });
    return `/shoppingcart/items/${bougthItem.keys()}`;
  }
}

const newItemSpecification = new ItemSpecification();
