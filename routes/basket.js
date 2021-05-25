const basket = (app, fs, bodyParser) => {
  const jsonParser = bodyParser.json();

  const getBasketContent = (req, res) => {
    fs.readFile("./public/items.json", (err, data) => {
      if (err) {
        throw err;
      }
      const jsonData = JSON.parse(data);
      let html = `<h1>My basket</h1> <form action="/">
      <input type="submit" value="Back"/> </form>`;
      jsonData.forEach((element) => {
        html += `<br> <li class="collection-item" id="${element.id}">
        <strong>Item: </strong>${element.item} || <strong>Quantity: </strong>${element.quantity} || <strong>Price: </strong>${element.price} zł
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil edit"></i>
          </a>
      </li>`;
      });
      res.send(html);
    });
  };

  const postClientData = (req, res) => {
    console.log(req.body);
    fs.writeFile("./public/items.json", JSON.stringify(req.body), (err) => {
      if (err) return console.log(err);
    });
  };

  app.route("/basket").get(getBasketContent).post(jsonParser, postClientData);
  // app.get("/basket", getBasketContent);
  // app.post("/basket", jsonParser, postClientData);
};

module.exports = basket;
