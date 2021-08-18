"use strict";

const getElementBy = (elementSelector) => {
  return document.querySelector(elementSelector);
};

const getElementValue = (elementSelector) => {
  return getElementBy(elementSelector).value;
};

const setElementValue = (selector, newValue) => {
  return (getElementBy(selector).value = newValue);
};

const getButtonHTML = (label, buttonId, dataAtrributeId, databaseId, buttonClass, colour) => {
  return `<button id="${buttonId}" data-id="${dataAtrributeId}" data-database-id="${databaseId}" class="${buttonClass} btn ${colour}">
        <i class="fa fa-pencil-square-o"></i> ${label} Item
      </button>`;
};

const insertItemHTML = (existingElementSelector, newElementHtml) => {
  return getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
};

const getUpdateBtn = (id, databaseId) => {
  return getButtonHTML("update", "update-btn", id, databaseId, "update-btn", "orange");
};

const getDeleteBtn = (id, databaseId) => {
  return getButtonHTML("delete", "delete-btn", id, databaseId, "delete-btn", "red");
};

const getItemHTML = (route, item) => {
  return `<li class="collection-item" id="${item.name}" data-id="${item._id}">
              <strong>Item: </strong>${item.name} || <strong>Quantity: </strong>${item.quantity} || <strong>Price: </strong>${item.price} $
              <a href="${route}" class="secondary-content">
              <i class="fa fa-pencil edit"></i>
              </a>
              </li>`;
};

const getSearchedItemsHTML = (item) => {
  return insertItemHTML(
    ".item-search",
    `
  <li class="searching-item" id="${item.name}">
    <a href="#">${item.name}</a>
  </li>`
  );
};

const setInnerText = (selector, newText) => {
  return (getElementBy(selector).innerText = newText);
};

const removeElementBy = (selector) => {
  return getElementBy(selector).remove();
};

const removeButtons = () => {
  if (getElementBy(".update-btn") == null) return;
  removeElementBy(".update-btn");
  removeElementBy(".delete-btn");
};

const resetView = () => {
  resetInputValue();
  document.querySelectorAll(".collection-item").forEach((item) => item.remove());
  document.querySelectorAll(".searching-item").forEach((item) => item.remove());
};

const notFilledInput = () => {
  return getElementValue("#item-name") == ""
    ? true
    : getElementValue("#item-quantity") == ""
    ? true
    : getElementValue("#item-price") == ""
    ? true
    : false;
};

const resetInputValue = () => {
  if (getElementBy(".row") == undefined) return;
  setElementValue("#item-name", "");
  setElementValue("#item-quantity", "");
  setElementValue("#item-price", "");
};

const matchTarget = (itemMap, targetItem) => {
  return itemMap.get(targetItem);
};

const editItem = (cart, targetItem) => {
  if (getElementBy(".update-btn") == null) return;

  const updatedItem = ShoppingCart.createNewCartItem();

  deleteItem(cart, targetItem);
  cart.itemMap.set(targetItem, updatedItem);
};

const deleteItem = (cart, targetItem) => {
  return cart.itemMap.delete(targetItem);
};

const arrayToMap = (array) => {
  return new Map(array.map((item) => [item.name, item]));
};
