"use strict";

class UI {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.createElement();
    this.stockList = [
      { name: "soup", price: "10" },
      { name: "chips", price: "15" },
      { name: "burger", price: "20" },
      { name: "burrito", price: "25" },
      { name: "potato", price: "2" },
      { name: "water", price: "1" },
      { name: "juice", price: "5" },
      { name: "cheese", price: "3" },
      { name: "fish", price: "50" },
      { name: "steak", price: "75" },
      { name: "carrot", price: "2.5" },
      { name: "nuggets", price: "17.5" },
    ];
  }

  createElement() {
    window.addEventListener("load", UI.showShoppingCart.bind(this));
    handleEventListener(".add-btn", "click", this.createNewItem.bind(this));
    handleEventListener(".clear-btn", "click", this.clearShoppingList.bind(this));
    handleEventListener(".back-btn", "click", hideUpdatePanel);
    handleEventListener(".collection", "click", this.getItemContent.bind(this));
    handleMultipleTypesOfEventListeners("#item-name", "input", "click", this.handleSearchEngine.bind(this));
  }

  createNewItem(e) {
    e.preventDefault();
    const newItem = ShoppingCart.createNewCartItem(e);
    checkingSearchEngineInput(this.stockList, newItem, this.shoppingCart, e);
    this.shoppingCart.addNewItem(newItem);
    renderCart("#", this.shoppingCart.itemMap);
    sendCartItems("/shoppingcart", checkingFullfilItem(newItem));
    refreshCart();
  }

  getItemContent(e) {
    if (!e.target.matches(".fa-pencil")) return;
    displayUpdatePanel(e.target.parentElement.parentElement.id, e.target.parentElement.parentElement.dataset.id);
    getUpdateItemValue(this.shoppingCart, e.target.parentElement.parentElement.id);
    refreshButtonId(e.target.parentElement.parentElement.id, e.target.parentElement.parentElement.dataset.id);
    this.updateItem();
    this.deleteItem();
    clearStockList();
  }

  updateItem() {
    if (!containsElement(".update-btn")) return;
    handleEventListener(".update-btn", "click", (e) => {
      e.preventDefault();
      const updatedItem = ShoppingCart.createNewCartItem(e);
      checkingSearchEngineInput(this.stockList, updatedItem, false, e);
      handleActionOfButton(".update-btn", this.shoppingCart, e, updatedItem);
      updateCartItem("/shoppingcart", e.target.dataset.databaseId, checkingFullfilItem(updatedItem));
      clearStockList();
      refreshCart();
    });
  }

  deleteItem() {
    if (!containsElement(".delete-btn")) return;
    handleEventListener(".delete-btn", "click", (e) => {
      e.preventDefault();
      const deletedItem = ShoppingCart.createNewCartItem(e);
      checkingSearchEngineInput(this.stockList, deletedItem, false, e);
      handleActionOfButton(".delete-btn", this.shoppingCart, e, deletedItem);
      deleteCartItem("/shoppingcart", e.target.dataset.databaseId, checkingFullfilItem(deletedItem));
      clearStockList();
      refreshCart();
    });
  }

  clearShoppingList() {
    handleActionOfButton(".clear-btn", this.shoppingCart);
    clearCart("/clear");
  }

  handleSearchEngine(e) {
    clearSearchEngine();
    searchForItem(this.stockList, e.target.value);
    handleEventListener(".item-search", "click", (e) => {
      getSearchingItem(this.stockList, e.target.parentElement.id);
    });
  }

  static showShoppingCart() {
    fetchShoppingCart("/show", (items) => {
      this.shoppingCart.itemMap = arrayToMap(items);
      renderCart("#", items);
    });
  }
}

const newUI = new UI();
