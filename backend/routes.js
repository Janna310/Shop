const router = require("express").Router();
const logger = require("morgan");

router.use(logger());

const cartItems = [
  { id: 1, product: "Shirt: solid", price: 20.0, quantity: 46 },
  { id: 2, product: "Jeans: dark", price: 35.0, quantity: 20 },
  { id: 3, product: "Sweater: knit", price: 27.0, quantity: 15 },
  { id: 4, product: "Jeans: light", price: 37.0, quantity: 18 },
  { id: 5, product: "Shirt: print", price: 23.0, quantity: 12 },
  { id: 6, product: "Jacket: leather", price: 50.0, quantity: 23 },
  { id: 7, product: "Jeans: ripped", price: 40.0, quantity: 30 },
  { id: 8, product: "Jacket: zip-up", price: 32.0, quantity: 19 },
  { id: 9, product: "Sweater: cable-knit", price: 26.0, quantity: 10 },
  { id: 10, product: "Sweater: hooded", price: 1.0079, quantity: 24 },
];

//return an array of all items
router.get("/cart-items", (req, res) => {
  res.status(200);
  res.json(cartItems);
});

//push - log the body to console
router.post("/cart-items", (res, res) => {
  cartItems.push({
    id: `${Number(cartItems.length + 1)}`,
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  console.log(
    cartItems.id,
    cartItems.product,
    cartItems.price,
    cartItems.quantity
  );
  res.json(cartItems);
});

//put - log id and body
router.put("/cart-items/:id", (req, res) => {
  const idx = cartItems.indexOf(req.params.id);
  cartItems.splice(idx, 1, req.body);
  console.log(idx);
  console.log(cartItems);
  res.json(cartItems);
});

//delete items - log id param
router.delete("cart-items/:id", (res, req) => {
  const idx = cartItems.indexOf(req.params.id);
  cartItems.splice(idx, 1, req.body);
  console.log(idx);
  res.json(cartItems);
});

module.exports = router;
