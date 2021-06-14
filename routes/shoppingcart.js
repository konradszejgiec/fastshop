const shoppingCart = (app, fs, bodyParser, path) => {
  const jsonParser = bodyParser.json();

  const getShoppingCartContent = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/shoppingcart/shoppingcart.html"));
  };

  const getSingleItemContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      const jsonData = JSON.parse(data);
      let html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css" />
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossorigin="anonymous"
          />
          <title>Fast Shop</title>
        </head>`;

      jsonData.forEach((element) => {
        if (req.params.id == element.id) {
          html += `<body>
          <!-- Navbar -->
          <nav>
            <div class="nav-wrapper grey">
              <div class="container">
                <a href="/" class="brand-logo left">Fast Shop</a>
                <ul class="right">
                  <li>
                    <a href="/shoppingcart" class="clear-btn btn grey lighten-1">Back</a>
                  </li>
                </ul>
            </div>
          </nav>
          <br />
          <div class="container">
            <h3 class="center-align">Item Price: <span class="item-price">${Number(element.quantity) * Number(element.price)} $</span></h3>
            <!-- Item List -->
            <ul id="item-list" class="collection">
            <br> <li class="collection-item" id="${element.id}">
            <strong>Item: </strong>${element.item} || <strong>Quantity: </strong>${element.quantity} || <strong>Price: </strong>${element.price} zł
          </li>
          </ul>
          </div>
      
          <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"
          ></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        </body>
      </html>`;
        }
      });
      res.send(html);
    });
  };

  const postClientData = (req, res) => {
    fs.writeFile("./public/items.json", JSON.stringify(req.body), (err) => {
      if (err) return console.log(err);
    });
  };

  app.route("/shoppingcart/:id").get(getSingleItemContent);
  app.route("/shoppingcart").get(getShoppingCartContent).post(jsonParser, postClientData);
};

module.exports = shoppingCart;
