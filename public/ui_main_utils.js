"use strict";

class MainUtils {
  constructor() {}

  static handleEventListener(elementSelector, eventListener, callback) {
    return BasicUtils.getElementBy(elementSelector).addEventListener(eventListener, callback);
  }

  static handleActionOfButton(button, cart, targetItem) {
    if (button == ".update-btn") BasicUtils.editItem(cart, targetItem);
    if (button == ".delete-btn") BasicUtils.deleteItem(cart, targetItem);
    if (button == ".clear-btn") cart.itemMap.clear();
    MainUtils.renderCart("#", cart.itemMap);
    BasicUtils.removeButtons();
  }

  static getUpdateItemValue(cart, target) {
    const targetItem = BasicUtils.matchTarget(cart.itemMap, target);
    BasicUtils.setElementValue("#item-name", targetItem.name);
    BasicUtils.setElementValue("#item-quantity", targetItem.quantity);
    BasicUtils.setElementValue("#item-price", targetItem.price);
  }

  static displayUpdatePanel(buttonId) {
    if (document.body.contains(BasicUtils.getElementBy(".update-btn"))) return;
    BasicUtils.insertItemHTML(".row", BasicUtils.getUpdateBtn(buttonId));
    BasicUtils.insertItemHTML(".row", BasicUtils.getDeleteBtn(buttonId));
  }

  static hideUpdatePanel() {
    BasicUtils.resetInputValue();
    BasicUtils.removeButtons();
  }

  static renderCart(route, cartItemMap) {
    BasicUtils.resetView();
    if (cartItemMap == undefined) {
      BasicUtils.setInnerText(".total-price", 0);
      return;
    } else BasicUtils.setInnerText(".total-price", ShoppingCart.priceSum(cartItemMap));

    cartItemMap.forEach((item) =>
      BasicUtils.insertItemHTML(".collection", BasicUtils.getItemHTML(route || `/shoppingcart/items/${item.name}`, item))
    );
  }

  static refreshButtonId(newId) {
    BasicUtils.getElementBy(".update-btn").dataset.id = newId;
    BasicUtils.getElementBy(".delete-btn").dataset.id = newId;
  }

  static containsButton(button) {
    return document.body.contains(BasicUtils.getElementBy(button));
  }
}
