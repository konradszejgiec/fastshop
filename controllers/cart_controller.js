"use strict";

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
      route: await cartControllerUtils.getShoppingCartContentRoute(Cart),
      message: await cartControllerUtils.getShoppingCartContentMessage(Cart),
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
  res.render("checkout", { message: await cartControllerUtils.getCheckoutContentMessage(Cart) });
};

exports.postClientData = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Cart.findByIdAndUpdate(req.body.id, req.body.item, {
      new: true,
      runValidators: true,
    });
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body.id);
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.deleteMany((err) => console.log("Collection removed succesfully"));
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};
