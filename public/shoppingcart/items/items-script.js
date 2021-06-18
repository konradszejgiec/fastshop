"use strict";

class ItemCart {
  constructor() {
    this.remainingItems = [];
    this.getItemContent(document.querySelector(".collection-item").id);
    document
      .querySelector(".buy-btn")
      .addEventListener("click", this.updateCartData.bind(this, this.remainingItems, document.querySelector(".collection-item").id));
  }

  getItemContent(itemId) {
    fetch("/items.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((element) => {
          if (element.id != itemId) {
            const remainingItem = new ShopItem(element.id, element.item, element.quantity, element.price);
            this.remainingItems.push(remainingItem);
          }
        });
      });
  }

  updateCartData(data, id) {
    fetch(`/shoppingcart/items/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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

const newItemCart = new ItemCart();
