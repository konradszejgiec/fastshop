"use strict";

const shoppingCartApi = (app, fs, bodyParser) => {
  const jsonParser = bodyParser.json();

  const items = (data) => {
    if (data == false) return;
    else return new Map(Object.entries(JSON.parse(data)));
  };

  const cartSize = (data) => {
    return items(data).size;
  };

  const renderMainPage = (req, res) => {
    res.render("index");
  };

  const getShoppingCartContentMessage = (data) => {
    return cartSize(data) > 0 ? "Buy Now" : "Oops, your cart is empty. Please back and add some items.";
  };

  const getShoppingCartContentRoute = (data) => {
    return cartSize(data) > 0 ? "/shoppingcart/checkout" : "/";
  };

  const getShoppingCartContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      res.render("shoppingcart", { route: getShoppingCartContentRoute(data), message: getShoppingCartContentMessage(data) });
    });
  };

  const getSingleItemInfo = (req, data, message) => {
    let item, id, price, quantity, totalItemPrice;
    items(data).forEach((element) => {
      if (req.params.id == element.name) {
        item = element.name;
        price = element.price;
        id = element.name;
        quantity = element.quantity;
        totalItemPrice = Number(element.quantity) * Number(element.price);
      }
    });
    return message == "item"
      ? item
      : message == "price"
      ? price
      : message == "id"
      ? id
      : message == "quantity"
      ? quantity
      : message == "totalItemPrice"
      ? totalItemPrice
      : "";
  };

  const getSingleItemContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      res.render("item_info", {
        item: getSingleItemInfo(req, data, "item"),
        price: getSingleItemInfo(req, data, "price"),
        id: getSingleItemInfo(req, data, "id"),
        quantity: getSingleItemInfo(req, data, "quantity"),
        totalItemPrice: getSingleItemInfo(req, data, "totalItemPrice"),
      });
    });
  };

  const getCheckoutContentMessage = (data) => {
    return cartSize(data) > 0
      ? `Congratulations! You have just bought item without paying for it! Your shopping cart has now ${cartSize(data)} items.`
      : `Congratulations! You have just bought items without paying for them! Your shopping cart is now empty.`;
  };

  const getCheckoutContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      res.render("checkout", { message: getCheckoutContentMessage(data) });
    });
  };

  const postClientData = (req, res) => {
    fs.writeFile("./public/items.json", JSON.stringify(req.body), (err) => {
      if (err) {
        res.status(500).end();
        console.log(err);
      } else {
        res.status(201).end();
      }
    });
  };

  app.route("/").get(renderMainPage);
  app.route("/shoppingcart").get(getShoppingCartContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/items/:id").get(getSingleItemContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/checkout").get(getCheckoutContent).post(jsonParser, postClientData);
};

module.exports = shoppingCartApi;
