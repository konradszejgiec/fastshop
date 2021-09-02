"use strict";

const sendData = (route, item) => {
  if (!item) return;
  return fetch(`${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => location.reload());
};

const updateCartItem = (route, id, item) => {
  if (!item) return;
  return fetch(`${route}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, item: item }),
  }).then((response) => location.reload());
};

const deleteCartItem = (route, id, item) => {
  if (!item) return;
  return fetch(`${route}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then((response) => location.reload());
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
