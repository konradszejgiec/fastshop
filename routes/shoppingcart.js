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

  /**
   * Zmieniła się struktura danych koszyka na frontendzie, może i tutaj warto byłoby zmienić? :-) 
   */
  const postClientData = (req, res) => {
    // Tutaj był bug - nigdy nie odsyłałeś odpowiedzi (res.end()), co kończyło się tym, że Promise po stronie frontendu
    // nigdy się nie kończył.
    fs.writeFile("./public/items.json", JSON.stringify(req.body), (err) => {
      if (err) {
        // nie udało się zapisać, zwracamy kod błędu po stronie serwera (500 Internal Server Error) i logujemy bład do konsoli.
        res.status(500).end();
        console.log(err);
      } else {
        // udało się zapisać, zwracamy kod odpowiedzi 201 Created
        res.status(201).end();
      };
    });
  };

  app.route("/").get(renderMainPage);
  app.route("/shoppingcart").get(getShoppingCartContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/items/:id").get(getSingleItemContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/checkout").get(getCheckoutContent).post(jsonParser, postClientData);
  app.route("/shoppingcart/items").get(getCheckoutContent);
};

module.exports = shoppingCart;
