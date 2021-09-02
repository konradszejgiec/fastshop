"use strict";

const handleEventListener = (elementSelector, eventListener, callback) => {
  return getElementBy(elementSelector).addEventListener(
    eventListener,
    callback
  );
};

const handleButtonAction = (button, cart, event, item) => {
  if (!item) {
    if (button == ".exit-btn") cart.itemMap.clear();
  } else if (containsAnInvalidValue(item)) {
    resetInputValue();
    removeButtons();
    return;
  }
  if (button == ".update-btn") editItem(cart, event.target.dataset.id, event);
  if (button == ".delete-btn") deleteItem(cart, event.target.dataset.id);
  renderCart("#", cart.itemMap);
  removeButtons();
};

const getUpdateItemValue = (cart, target) => {
  const targetItem = matchTarget(cart.itemMap, target);
  setElementValue("#item-name", targetItem.name);
  setElementValue("#item-quantity", targetItem.quantity);
  setElementValue("#item-price", targetItem.price);
};

const displayUpdatePanel = (buttonId, databaseId) => {
  if (document.body.contains(getElementBy(".update-btn"))) return;
  insertItemHTML(".input-panel", getUpdateBtn(buttonId, databaseId));
  insertItemHTML(".input-panel", getDeleteBtn(buttonId, databaseId));
  removeElementBy(".add-btn");
};

const renderCart = (route, cartItemMap) => {
  resetView();
  hideUpdatePanel();
  if (cartItemMap == undefined) {
    setInnerText(".total-price", 0);
    return;
  } else setInnerText(".total-price", ShoppingCart.priceSum(cartItemMap));

  cartItemMap.forEach((item) => {
    if (containsAnInvalidValue(item)) {
      resetInputValue();
      return;
    } else
      insertItemHTML(
        ".collection",
        getItemHTML(route || `/shoppingcart/items/${item._id}`, item)
      );
  });
};

const refreshButtonId = (newId, newDatabaseId) => {
  getElementBy(".update-btn").dataset.id = newId;
  getElementBy(".update-btn").dataset.databaseId = newDatabaseId;
  getElementBy(".delete-btn").dataset.id = newId;
  getElementBy(".delete-btn").dataset.databaseId = newDatabaseId;
};

const getItemId = (cart) => {
  let itemId;
  cart.itemMap.forEach((item) => {
    if (getElementBy(".collection-item").id == item._id) {
      itemId = item._id;
    }
  });
  return itemId;
};

const clearSearchEngine = () => {
  if (getElementBy("#item-name").value == "") {
    setElementValue("#item-price", "");
    setElementValue("#item-quantity", "");
  }
  clearStockList();
};

const searchForItem = (items, input) => {
  if (input == "") return;
  else
    return items.map((item) => {
      if (item.name.toLowerCase().includes(input.toLowerCase())) {
        getSearchedItemsHTML(item);
        if (getElementValue("#item-name") != item.name) {
          setElementValue("#item-price", "");
          setElementValue("#item-quantity", "");
        }
      }
    });
};

const getSearchingItem = (items, searchedItem) => {
  if (!searchedItem) return;
  items.map((item) => {
    if (searchedItem == item.name) {
      setElementValue("#item-name", item.name);
      setElementValue("#item-price", item.price);
    }
  });
  getElementBy(".item-search").textContent = "";
};

const checkingSearchEngineInput = (items, item, event) => {
  if (!items.map((item) => item.name).includes(getElementValue("#item-name"))) {
    event.stopImmediatePropagation();
    resetInputValue();
    return alert(
      "Sorry, we do not have what are you looking for. Please choose something from our list."
    );
  }
  checkingDataCompleteness(item);
};

const checkingDataCompleteness = (item) => {
  if (containsAnInvalidValue(item)) {
    return alert("Please fill all empty fields!");
  } else return item;
};

const exceedingCartLimit = (cart, event) => {
  if (cart.itemMap.size >= 10) {
    event.stopImmediatePropagation();
    alert("Cannot add new item. Please clear cart or delete item.");
    resetInputValue();
    return true;
  }
};

const handleEventListenerTypes = (selector, eventTypeOne, eventTypeSec, fn) => {
  handleEventListener(selector, eventTypeOne, fn);
  handleEventListener(selector, eventTypeSec, fn);
};
