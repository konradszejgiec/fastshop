"use strict";

class UI {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.createElement();
  }

  createElement() {
    window.addEventListener("load", UI.showShoppingCart.bind(this));
    window.addEventListener("load", UI.getStockList.bind(this));
    handleEventListener(".exit-btn", "click", handleExitButton);
    handleEventListener(
      ".clear-btn",
      "click",
      this.clearShoppingList.bind(this)
    );
    handleEventListener(".add-btn", "click", this.createNewItem.bind(this));
    handleEventListener(".back-btn", "click", hideUpdatePanel);
    handleEventListener(".collection", "click", this.getItemContent.bind(this));
    handleEventListenerTypes(
      "#item-name",
      "input",
      "click",
      this.handleSearchEngine.bind(this)
    );
  }

  createNewItem(e) {
    e.preventDefault();
    const newItem = ShoppingCart.createNewCartItem(e);
    checkingSearchEngineInput(this.stockList, newItem, e);
    if (exceedingCartLimit(this.shoppingCart, e)) return;
    this.shoppingCart.addNewItem(newItem);
    renderCart("#", this.shoppingCart.itemMap);
    sendData("/shoppingcart", checkingDataCompleteness(newItem));
  }

  getItemContent(e) {
    if (!e.target.matches(".fa-pencil")) return;
    displayUpdatePanel(
      e.target.parentElement.parentElement.id,
      e.target.parentElement.parentElement.dataset.id
    );
    getUpdateItemValue(
      this.shoppingCart,
      e.target.parentElement.parentElement.id
    );
    refreshButtonId(
      e.target.parentElement.parentElement.id,
      e.target.parentElement.parentElement.dataset.id
    );
    this.updateItem();
    this.deleteItem();
    clearStockList();
  }

  updateItem() {
    if (!containsElement(".update-btn")) return;
    handleEventListener(".update-btn", "click", (e) => {
      e.preventDefault();
      const updatedItem = ShoppingCart.createNewCartItem(e);
      checkingSearchEngineInput(this.stockList, updatedItem, e);
      handleButtonAction(".update-btn", this.shoppingCart, e, updatedItem);
      updateCartItem(
        "/shoppingcart",
        e.target.dataset.databaseId,
        checkingDataCompleteness(updatedItem)
      );
      clearStockList();
    });
  }

  deleteItem() {
    if (!containsElement(".delete-btn")) return;
    handleEventListener(".delete-btn", "click", (e) => {
      e.preventDefault();
      const deletedItem = ShoppingCart.createNewCartItem(e);
      checkingSearchEngineInput(this.stockList, deletedItem, e);
      handleButtonAction(".delete-btn", this.shoppingCart, e, deletedItem);
      deleteCartItem(
        "/shoppingcart",
        e.target.dataset.databaseId,
        checkingDataCompleteness(deletedItem)
      );
      clearStockList();
      refreshCart();
    });
  }

  clearShoppingList() {
    handleButtonAction(".clear-btn", this.shoppingCart);
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

  static getStockList() {
    this.stockList;
    fetchShoppingCart("/stocklist", (items) => {
      this.stockList = items;
    });
  }
}

const newUI = new UI();
