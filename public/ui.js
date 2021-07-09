"use strict";

class UI {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.createElement();
  }

  createElement() {
    handleEventListener(".add-btn", "click", this.createNewItem.bind(this));
    handleEventListener(".clear-btn", "click", this.clearShoppingList.bind(this));
    handleEventListener(".back-btn", "click", hideUpdatePanel);
    handleEventListener(".shoppingcart-show-btn", "click", UI.showShoppingCart.bind(this));
    handleEventListener(".collection", "click", this.getItemContent.bind(this));
  }

  createNewItem(e) {
    e.preventDefault();
    this.newItem = ShoppingCart.createNewCartItem();
    this.shoppingCart.addNewItem(this.newItem);
    renderCart("#", this.shoppingCart.itemMap);
    console.log(this.newItem);
    sendCartItems("/shoppingcart", this.newItem);
  }

  getItemContent(e) {
    if (!e.target.matches(".fa-pencil")) return;
    displayUpdatePanel(e.target.parentElement.parentElement.id);
    getUpdateItemValue(this.shoppingCart, e.target.parentElement.parentElement.id);
    refreshButtonId(e.target.parentElement.parentElement.id);
    this.updateItem();
    this.deleteItem();
  }

  updateItem() {
    if (!containsButton(".update-btn")) return;
    handleEventListener(".update-btn", "click", (e) => {
      e.preventDefault();
      handleActionOfButton(".update-btn", this.shoppingCart, e.target.dataset.id);
      sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
    });
  }

  deleteItem() {
    if (!containsButton(".delete-btn")) return;
    handleEventListener(".delete-btn", "click", (e) => {
      e.preventDefault();
      handleActionOfButton(".delete-btn", this.shoppingCart, e.target.dataset.id);
      sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
    });
  }

  clearShoppingList() {
    handleActionOfButton(".clear-btn", this.shoppingCart);
    sendCartItems("/shoppingcart", this.shoppingCart.itemMap);
  }

  static showShoppingCart(e) {
    e.preventDefault();
    fetchShoppingCart("/show", (items) => {
      console.log(items);
      this.shoppingCart.itemMap = arrayToMap(items);
      console.log(this.shoppingCart.itemMap);
      renderCart("#", items);
    });
  }
}

const newUI = new UI();
