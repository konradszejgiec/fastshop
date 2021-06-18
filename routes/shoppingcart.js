const shoppingCart = (app, fs, bodyParser, path) => {
  const jsonParser = bodyParser.json();

  const renderMainPage = (req, res) => {
    res.render("index");
  };

  const getShoppingCartContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      const jsonData = JSON.parse(data);

      const message = jsonData.length > 0 ? "Proceed to checkout" : "Oops, your cart is empty. Please back and add some items.";
      const route = jsonData.length > 0 ? "/shoppingcart/checkout" : "/";

      res.render("shoppingcart", { route: route, message: message });
    });
  };

  const getSingleItemContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }

      const jsonData = JSON.parse(data);

      let item, id, price, quantity, totalItemPrice;

      jsonData.forEach((element) => {
        if (req.params.id == element.id) {
          item = element.item;
          price = element.price;
          id = element.id;
          quantity = element.quantity;
          totalItemPrice = Number(element.quantity) * Number(element.price);
        }
      });
      res.render("item-info", { item: item, price: price, id: id, quantity: quantity, totalItemPrice: totalItemPrice });
    });
  };

  const getCheckoutContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      const jsonData = JSON.parse(data);

      const message =
        jsonData.length > 0
          ? `Congratulations! You have just bought item without paying for it! Your shopping cart has now ${jsonData.length} items.`
          : `Congratulations! You have just bought items without paying for them! Your shopping cart is now empty.`;
      res.render("checkout", { message: message });
    });
  };

  const postClientData = (req, res) => {
    fs.writeFile("./public/items.json", JSON.stringify(req.body), (err) => {
      if (err) return console.log(err);
    });
  };

  app.route("/").get(renderMainPage);
  app.route("/shoppingcart").get(getShoppingCartContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/items/:id").get(getSingleItemContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/checkout").get(getCheckoutContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/items").get(getCheckoutContent);
};

module.exports = shoppingCart;
