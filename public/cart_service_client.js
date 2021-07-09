"use strict";

const sendCartItems = (route, cartItems) => {
  return fetch(`${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  });
};

const fetchShoppingCart = (route, callback) => {
  fetch(`${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((items) => callback(items));
};
