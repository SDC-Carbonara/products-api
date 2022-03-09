const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllProducts,
  getProduct,
  getStyles,
  getRelated,
} = require("../db/index.js");

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.get("/products", getAllProducts);
app.get("/products/:product_id", getProduct);
app.get("/products/:product_id/styles", getStyles);
app.get("/products/:product_id/related", getRelated);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
