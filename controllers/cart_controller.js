"use strict";

const fs = require("fs");
const Cart = require("../models/database");
const cartControllerUtils = require("./cart_controllers_utils");

exports.displayMainPage = async (req, res) => {
  res.render("index");
};

exports.renderCartItems = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).send(cart);
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.displayShoppingCartContent = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).render("shoppingcart", {
      route: cartControllerUtils.getShoppingCartContentRoute(cart),
      message: cartControllerUtils.getShoppingCartContentMessage(cart),
    });
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.displaySingleItemContent = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.render("item_info", {
      item: cartControllerUtils.getSingleItemInfo(req, cart, "item"),
      price: cartControllerUtils.getSingleItemInfo(req, cart, "price"),
      id: cartControllerUtils.getSingleItemInfo(req, cart, "id"),
      quantity: cartControllerUtils.getSingleItemInfo(req, cart, "quantity"),
      totalItemPrice: cartControllerUtils.getSingleItemInfo(req, cart, "totalItemPrice"),
    });
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.displayCheckoutContent = async (req, res) => {
  res.render("checkout", { message: cartControllerUtils.getCheckoutContentMessage(data) });
};

exports.postClientData = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).end();
  } catch (err) {
    res.status(500).end();
    console.log(err);
  }
};
