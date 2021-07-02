class BasicUtils {
  constructor() {}

  static getElementBy(elementSelector) {
    return document.querySelector(elementSelector);
  }

  static getElementValue(elementSelector) {
    return BasicUtils.getElementBy(elementSelector).value;
  }

  static setElementValue(selector, newValue) {
    return (BasicUtils.getElementBy(selector).value = newValue);
  }

  static getButtonHTML(label, buttonId, dataAtrribute, buttonClass, colour) {
    return `<button id="${buttonId}" data-id="${dataAtrribute}" class="${buttonClass} btn ${colour}">
        <i class="fa fa-pencil-square-o"></i> ${label} Item
      </button>`;
  }

  static insertItemHTML(existingElementSelector, newElementHtml) {
    return BasicUtils.getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
  }

  static getUpdateBtn(id) {
    return BasicUtils.getButtonHTML("update", "update-btn", id, "update-btn", "orange");
  }

  static getDeleteBtn(id) {
    return BasicUtils.getButtonHTML("delete", "delete-btn", id, "delete-btn", "red");
  }

  static getItemHTML(route, item) {
    return `<li class="collection-item" id="${item.name}">
              <strong>Item: </strong>${item.name} || <strong>Quantity: </strong>${item.quantity} || <strong>Price: </strong>${item.price} $
              <a href="${route}" class="secondary-content">
              <i class="fa fa-pencil edit"></i>
              </a>
              </li>`;
  }

  static setInnerText(selector, newText) {
    return (BasicUtils.getElementBy(selector).innerText = newText);
  }

  static removeElementBy(selector) {
    return BasicUtils.getElementBy(selector).remove();
  }

  static removeButtons() {
    if (BasicUtils.getElementBy(".update-btn") == null) return;
    BasicUtils.removeElementBy(".update-btn");
    BasicUtils.removeElementBy(".delete-btn");
  }

  static resetView() {
    BasicUtils.resetInputValue();
    document.querySelectorAll(".collection-item").forEach((item) => item.remove());
  }

  static notFilledInput() {
    return BasicUtils.getElementValue("#item-name") == ""
      ? true
      : BasicUtils.getElementValue("#item-quantity") == ""
      ? true
      : BasicUtils.getElementValue("#item-price") == ""
      ? true
      : false;
  }

  static resetInputValue() {
    if (BasicUtils.getElementBy(".row") == undefined) return;
    BasicUtils.setElementValue("#item-name", "");
    BasicUtils.setElementValue("#item-quantity", "");
    BasicUtils.setElementValue("#item-price", "");
  }

  static matchTarget(itemMap, targetItem) {
    return itemMap.get(targetItem);
  }

  static editItem(cart, targetItem) {
    if (BasicUtils.getElementBy(".update-btn") == null) return;

    const updatedItem = ShoppingCart.createNewCartItem();

    BasicUtils.deleteItem(cart, targetItem);
    cart.itemMap.set(targetItem, updatedItem);
  }

  static deleteItem(cart, targetItem) {
    return cart.itemMap.delete(targetItem);
  }

  static objectToMap(object) {
    return new Map(Object.entries(object));
  }
}
