"use strict";

class UI {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.createElement();
  }

  createElement() {
    MainUtils.handleEventListener(".add-btn", "click", this.createNewItem.bind(this));
    MainUtils.handleEventListener(".clear-btn", "click", this.clearShoppingList.bind(this));
    MainUtils.handleEventListener(".back-btn", "click", MainUtils.hideUpdatePanel);
    MainUtils.handleEventListener(".shoppingcart-show-btn", "click", UI.showShoppingCart.bind(this));
    MainUtils.handleEventListener(".collection", "click", this.getItemContent.bind(this));
  }

  createNewItem(e) {
    e.preventDefault();
    this.shoppingCart.addNewItem(ShoppingCart.createNewCartItem());
    MainUtils.renderCart("#", this.shoppingCart.itemMap);
    CartServiceClient.sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
  }

  getItemContent(e) {
    if (!e.target.matches(".fa-pencil")) return;
    MainUtils.displayUpdatePanel(e.target.parentElement.parentElement.id);
    MainUtils.getUpdateItemValue(this.shoppingCart, e.target.parentElement.parentElement.id);
    MainUtils.refreshButtonId(e.target.parentElement.parentElement.id);
    this.updateItem();
    this.deleteItem();
  }

  updateItem() {
    if (!MainUtils.containsButton(".update-btn")) return;
    MainUtils.handleEventListener(".update-btn", "click", (e) => {
      e.preventDefault();
      MainUtils.handleActionOfButton(".update-btn", this.shoppingCart, e.target.dataset.id);
      CartServiceClient.sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
    });
  }

  deleteItem() {
    if (!MainUtils.containsButton(".delete-btn")) return;
    MainUtils.handleEventListener(".delete-btn", "click", (e) => {
      e.preventDefault();
      MainUtils.handleActionOfButton(".delete-btn", this.shoppingCart, e.target.dataset.id);
      CartServiceClient.sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
    });
  }

  clearShoppingList() {
    MainUtils.handleActionOfButton(".clear-btn", this.shoppingCart);
    CartServiceClient.sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
  }

  static showShoppingCart(e) {
    e.preventDefault();
    CartServiceClient.fetchShoppingCart((items) => {
      this.shoppingCart.itemMap = BasicUtils.objectToMap(items);
      MainUtils.renderCart("#", BasicUtils.objectToMap(items));
    });
  }
}

const newUI = new UI();
