"use strict";

class CartServiceClient {
  constructor() {}

  static sendCartItems(route, cartItems) {
    return fetch(`${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(cartItems)),
    });
  }

  static fetchShoppingCart(callback) {
    fetch("/items.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((items) => callback(items));
  }
}
