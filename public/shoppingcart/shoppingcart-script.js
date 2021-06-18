"use strict";

class ShoppingCart {
  constructor() {
    this.itemList = [];
    this.getShoppingCartContent();
  }

  showShoppingCart() {
    let totalPrice = 0;
    this.itemList.map((element) => {
      document.querySelector(".collection").insertAdjacentHTML(
        "beforeend",
        `<li class="collection-item" id="${element.id}">
         <strong>Item: </strong>${element.item} || <strong>Quantity: </strong>${element.quantity} || <strong>Price: </strong>${element.price} $
          <a href="./items/${element.id}" class="secondary-content">
            <i class="fa fa-arrow-circle-up"></i>
          </a>
        </li>`
      );
      totalPrice += Number(element.price) * Number(element.quantity);
    });
    document.querySelector(".total-price").innerText = totalPrice;
    document.querySelector(".proceed-btn").addEventListener("click", this.clearDataFromCart.bind(this));
  }

  getShoppingCartContent() {
    fetch("/items.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((element) => {
          const newItem = new ShopItem(element.id, element.item, element.quantity, element.price);
          this.itemList.push(newItem);
        });
        this.showShoppingCart();
      });
  }

  clearDataFromCart() {
    fetch(`/shoppingcart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
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

const newShoppingCart = new ShoppingCart();
