"use strict";

class ShoppingCart {
  constructor() {
    this.itemMap = new Map();
  }

  addNewItem(item) {
    if (notFilledInput()) return;
    else this.itemMap.set(item.name, item);
  }

  static priceSum(items) {
    let total = 0;
    items.forEach((item) => {
      total += Number(item.price) * Number(item.quantity);
    });
    return total;
  }

  static createNewCartItem(event) {
    event.stopImmediatePropagation();
    return new ShopItem(getElementValue("#item-name"), getElementValue("#item-quantity"), getElementValue("#item-price"));
  }
}
