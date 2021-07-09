"use strict";

const handleEventListener = (elementSelector, eventListener, callback) => {
  return getElementBy(elementSelector).addEventListener(eventListener, callback);
};

const handleActionOfButton = (button, cart, targetItem) => {
  if (button == ".update-btn") editItem(cart, targetItem);
  if (button == ".delete-btn") deleteItem(cart, targetItem);
  if (button == ".clear-btn") cart.itemMap.clear();
  renderCart("#", cart.itemMap);
  removeButtons();
};

const getUpdateItemValue = (cart, target) => {
  const targetItem = matchTarget(cart.itemMap, target);
  setElementValue("#item-name", targetItem.name);
  setElementValue("#item-quantity", targetItem.quantity);
  setElementValue("#item-price", targetItem.price);
};

const displayUpdatePanel = (buttonId) => {
  if (document.body.contains(getElementBy(".update-btn"))) return;
  insertItemHTML(".row", getUpdateBtn(buttonId));
  insertItemHTML(".row", getDeleteBtn(buttonId));
};

const hideUpdatePanel = () => {
  resetInputValue();
  removeButtons();
};

const renderCart = (route, cartItemMap) => {
  resetView();
  if (cartItemMap == undefined) {
    setInnerText(".total-price", 0);
    return;
  } else setInnerText(".total-price", ShoppingCart.priceSum(cartItemMap));

  cartItemMap.forEach((item) => insertItemHTML(".collection", getItemHTML(route || `/shoppingcart/items/${item.name}`, item)));
};

const refreshButtonId = (newId) => {
  getElementBy(".update-btn").dataset.id = newId;
  getElementBy(".delete-btn").dataset.id = newId;
};

const containsButton = (button) => {
  return document.body.contains(getElementBy(button));
};
