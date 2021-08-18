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

const updateCartItem = (route, id, item) => {
  return fetch(`${route}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, item: item }),
  });
};

const deleteCartItem = (route, id) => {
  return fetch(`${route}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
};

const clearCart = (route) => {
  return fetch(`${route}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
