"use strict";

class UI {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.createElement();
    this.shopItems = [
      { name: "soup", price: "10" },
      { name: "chips", price: "15" },
      { name: "burger", price: "20" },
      { name: "burrito", price: "25" },
      { name: "potato", price: "2" },
    ];
  }

  createElement() {
    handleEventListener(".add-btn", "click", this.createNewItem.bind(this));
    handleEventListener(".clear-btn", "click", this.clearShoppingList.bind(this));
    handleEventListener(".back-btn", "click", hideUpdatePanel);
    handleEventListener(".shoppingcart-show-btn", "click", UI.showShoppingCart.bind(this));
    handleEventListener(".collection", "click", this.getItemContent.bind(this));
    handleEventListener("#item-name", "input", this.handleSearchEngine.bind(this));
  }

  createNewItem(e) {
    e.preventDefault();
    checkingSearchEngineInput(this.shopItems);
    this.shoppingCart.addNewItem(newItem);
    renderCart("#", this.shoppingCart.itemMap);
    sendCartItems("/shoppingcart", newItem);
  }

  getItemContent(e) {
    if (!e.target.matches(".fa-pencil")) return;
    displayUpdatePanel(e.target.parentElement.parentElement.id, e.target.parentElement.parentElement.dataset.id);
    getUpdateItemValue(this.shoppingCart, e.target.parentElement.parentElement.id);
    refreshButtonId(e.target.parentElement.parentElement.id, e.target.parentElement.parentElement.dataset.id);
    this.updateItem();
    this.deleteItem();
  }

  updateItem() {
    if (!containsElement(".update-btn")) return;
    handleEventListener(".update-btn", "click", (e) => {
      e.preventDefault();
      checkingSearchEngineInput(this.shopItems, ShoppingCart.createNewCartItem());
      handleActionOfButton(".update-btn", this.shoppingCart, e.target.dataset.id);
      updateCartItem("/shoppingcart", e.target.dataset.databaseId, checkingFullfilItem(ShoppingCart.createNewCartItem()));
    });
  }

  deleteItem() {
    if (!containsElement(".delete-btn")) return;
    handleEventListener(".delete-btn", "click", (e) => {
      e.preventDefault();
      handleActionOfButton(".delete-btn", this.shoppingCart, e.target.dataset.id);
      deleteCartItem("/shoppingcart", e.target.dataset.databaseId);
    });
  }

  clearShoppingList() {
    handleActionOfButton(".clear-btn", this.shoppingCart);
    clearCart("/clear");
  }

  handleSearchEngine(e) {
    clearSearchEngine();
    searchForItem(this.shopItems, e.target.value);
    handleEventListener(".item-search", "click", (e) => {
      getSearchingItem(this.shopItems, e.target.parentElement.id);
    });
  }

  static showShoppingCart(e) {
    e.preventDefault();
    fetchShoppingCart("/show", (items) => {
      this.shoppingCart.itemMap = arrayToMap(items);
      renderCart("#", items);
    });
  }
}

const newUI = new UI();
