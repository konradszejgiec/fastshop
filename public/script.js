"use strict";

class UI {
  constructor() {
    this.itemList = [];
    this.orderNumber = this.itemList.length + 1;
    this.createElement();
    this.isEdit = true;
    this.isShowedBasket = true;
  }

  static getHTMLElement(element, method, action, fn) {
    if (method === "addEventListener") return document.querySelector(element).addEventListener(action, fn);
    if (method === "insertAdjacentHTML") {
      return document.querySelector(element).insertAdjacentHTML(action, fn);
    } else return document.querySelector(element);
  }

  static getItem() {
    return UI.getHTMLElement("#item-name").value;
  }

  static getQuantity() {
    return UI.getHTMLElement("#item-quantity").value;
  }

  static getPrice() {
    return UI.getHTMLElement("#item-price").value;
  }

  createElement() {
    UI.getHTMLElement("#item-name", "addEventListener", "input", UI.getItem);
    UI.getHTMLElement("#item-quantity", "addEventListener", "input", UI.getQuantity);
    UI.getHTMLElement("#item-price", "addEventListener", "input", UI.getPrice);
    UI.getHTMLElement(".add-btn", "addEventListener", "click", this.createNewItemObject.bind(this));
    UI.getHTMLElement(".clear-btn", "addEventListener", "click", this.clearShoppingList.bind(this));
    UI.getHTMLElement(".back-btn", "addEventListener", "click", this.resetElements.bind(this, true));
    UI.getHTMLElement(".basket-show-btn", "addEventListener", "click", this.showBasket.bind(this));
    UI.getHTMLElement(".collection", "addEventListener", "click", this.getItemContent.bind(this));
  }

  createNewItemObject(e) {
    this.isShowedBasket = false;
    e.preventDefault();
    const handleEmptyInput = UI.getItem() === "" ? false : UI.getQuantity() === "" ? false : UI.getPrice() === "" ? false : true;
    if (!handleEmptyInput) {
      alert("Please fill all empty fields!");
      return;
    }
    this.orderNumber = this.refreshId(Math.max(...this.itemList.map((item) => item.id), 0), this.itemList.length + 1);
    const newItem = new ShopItem(this.orderNumber, UI.getItem(), UI.getQuantity(), UI.getPrice());
    this.itemList.push(newItem);
    this.sendData(this.itemList);
    UI.displayItemList(this.orderNumber, UI.getItem(), UI.getQuantity(), UI.getPrice(), this.itemList);
    this.resetElements();
  }

  static displayItemList(id, item, quantity, price, items) {
    const html = `<li class="collection-item" id="${id}">
                    <strong>Item: </strong>${item} || <strong>Quantity: </strong>${quantity} || <strong>Price: </strong>${price} zł
                      <a href="#" class="secondary-content">
                        <i class="fa fa-pencil edit"></i>
                      </a>
                  </li>`;
    UI.getHTMLElement("#item-list", "insertAdjacentHTML", "beforeend", html);
    UI.priceSum(items);
  }

  displayEditPanel() {
    const html = `<button class="update-btn btn orange">
                    <i class="fa fa-pencil-square-o"></i> Edit Item
                  </button>
                  <button class="delete-btn btn red">
                    <i class="fa fa-remove"></i> Delete Item
                  </button>`;
    if (document.body.contains(UI.getHTMLElement(".update-btn"))) return;
    UI.getHTMLElement(".row", "insertAdjacentHTML", "beforeend", html);
  }

  getItemContent(e) {
    this.id = e.target.parentElement.parentElement.id;
    if (!e.target.matches(".fa-pencil")) return;
    this.displayEditPanel();
    this.itemList.forEach((item) => {
      if (item.id == this.id) return (this.isEdit = true);
    });
    if (!this.isEdit) return;
    const index = this.itemList.findIndex((item) => item.id == this.id);
    UI.getHTMLElement("#item-name").value = this.itemList[index].item;
    UI.getHTMLElement("#item-quantity").value = this.itemList[index].quantity;
    UI.getHTMLElement("#item-price").value = this.itemList[index].price;
    this.editItem(UI.getHTMLElement(".update-btn"));
    this.deleteItem(UI.getHTMLElement(".delete-btn"));
  }

  static priceSum(items) {
    let total = 0;
    items.map((item) => {
      total += Number(item.price) * Number(item.quantity);
    });
    UI.getHTMLElement(".total-price").innerText = total;
  }

  editItem(button) {
    if (!document.body.contains(button)) return;
    UI.getHTMLElement(".update-btn", "addEventListener", "click", (e) => {
      e.preventDefault();
      if (!this.isEdit) return;
      const index = this.itemList.findIndex((item) => item.id == this.id);
      this.itemList[index].item = UI.getHTMLElement("#item-name").value;
      this.itemList[index].quantity = UI.getHTMLElement("#item-quantity").value;
      this.itemList[index].price = UI.getHTMLElement("#item-price").value;
      document.getElementById(`${this.id}`).innerHTML = `<strong>Przedmiot: </strong>${
        UI.getHTMLElement("#item-name").value
      } || <strong>Quantity: </strong>${UI.getHTMLElement("#item-quantity").value} || <strong>Price: </strong>${
        UI.getHTMLElement("#item-price").value
      } zł
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil"></i>
          </a>`;
      UI.priceSum(this.itemList);
      this.resetElements(true);
      this.isEdit = false;
      this.sendData(this.itemList);
    });
  }

  deleteItem(button) {
    if (!document.body.contains(button)) return;
    UI.getHTMLElement(".delete-btn", "addEventListener", "click", (e) => {
      e.preventDefault();
      if (!this.isEdit) return;
      const index = this.itemList.findIndex((item) => item.id == this.id);
      this.itemList.splice(index, 1);
      this.resetElements(true);
      document.getElementById(`${this.id}`).remove();
      UI.priceSum(this.itemList);
      this.isEdit = false;
      this.sendData(this.itemList);
    });
  }

  refreshId(lastId, currentId) {
    if (lastId >= currentId) {
      return lastId + 1;
    } else return this.itemList.length + 1;
  }

  resetElements(allElements = false) {
    if (allElements) {
      UI.getHTMLElement("#item-name").value = "";
      UI.getHTMLElement("#item-quantity").value = "";
      UI.getHTMLElement("#item-price").value = "";
      if (!document.body.contains(UI.getHTMLElement(".update-btn"))) return;
      UI.getHTMLElement(".update-btn").remove();
      UI.getHTMLElement(".delete-btn").remove();
    } else {
      UI.getHTMLElement("#item-name").value = "";
      UI.getHTMLElement("#item-quantity").value = "";
      UI.getHTMLElement("#item-price").value = "";
    }
  }

  clearShoppingList() {
    this.resetElements(true);
    this.itemList = [];
    document.querySelectorAll(".collection-item").forEach((item) => item.remove());
    UI.getHTMLElement(".total-price").innerText = 0;
    this.sendData(this.itemList);
  }

  sendData(data) {
    fetch(`/basket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  showBasket() {
    if (!this.isShowedBasket) return;
    fetch("/items.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((elem) => {
          const newItem = new ShopItem(elem.id, elem.item, elem.quantity, elem.price);
          UI.displayItemList(elem.id, elem.item, elem.quantity, elem.price, data);
          this.itemList.push(newItem);
        });
      });
    this.isShowedBasket = false;
  }
}

class ShopItem {
  constructor(id, item, quantity, price) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.price = price;
  }
}

const newUI = new UI();
