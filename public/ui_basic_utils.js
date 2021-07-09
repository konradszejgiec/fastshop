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

const getButtonHTML = (label, buttonId, dataAtrribute, buttonClass, colour) => {
  return `<button id="${buttonId}" data-id="${dataAtrribute}" class="${buttonClass} btn ${colour}">
        <i class="fa fa-pencil-square-o"></i> ${label} Item
      </button>`;
};

const insertItemHTML = (existingElementSelector, newElementHtml) => {
  return getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
};

const getUpdateBtn = (id) => {
  return getButtonHTML("update", "update-btn", id, "update-btn", "orange");
};

const getDeleteBtn = (id) => {
  return getButtonHTML("delete", "delete-btn", id, "delete-btn", "red");
};

const getItemHTML = (route, item) => {
  return `<li class="collection-item" id="${item.name}">
              <strong>Item: </strong>${item.name} || <strong>Quantity: </strong>${item.quantity} || <strong>Price: </strong>${item.price} $
              <a href="${route}" class="secondary-content">
              <i class="fa fa-pencil edit"></i>
              </a>
              </li>`;
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
