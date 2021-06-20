/**
 * Nie przeglądałem dokładnie kodu backednowego :-) 
 * 
 * Generalnie te same zasady, jak opisywałem w wypadku tego, co się w aplikacji frontowej działo:
 * 1. staraj się dzielić kod na mniejsze klasy / funkcjonalności odpowiadające za jeden obszar
 * 2. staraj się unikać współdzielonego "stanu" - to jest takich informacji, które mogą być modyfikowane z różnych
 * miejsc w klasie - (jak np. flagi isEdit itd.) - dużo trudniej połapać się, co się dzieje w kodzie
 */
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const shoppingCart = require("./routes/shoppingcart");
const port = 3000;

app.listen(port, () => {
  console.log("Server is running");
});

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");

shoppingCart(app, fs, bodyParser, path);
