const router = require("express").Router();
const pool = require("./connection");

//get ALL data from Server/table name Server = gc_postgres table = ExpressShopDB
//create new server on different port? can't create different schemas in terminal

//get /cart-items
router.get("/cart-items", (req, res) => {
  pool.query("SELECT * FROM customers").then((data) => {
    res.status(200);
    res.json(data.rows);
  });
});

// get items by id -- traditional pool.query("UPDATE ExpressShopDB=$1::text WHERE id=$2::int", [req.body.name, req.params.id]
// ::text(type: string) ::INT(type:number)
//$number (number 1, number 2)
// get items by id -- destructuring
router.get("/cart-items/:id", (req, res) => {
  const {
    body: { name },
    params: { id },
  } = req;
  pool
    .query("UPDATE ExpressShopDB=$1::text WHERE id=$2::int", [name, id])
    .then((data) => {
      if (id.length >= 1) {
        res.status(200);
        res.json({
          message: `Retrieved id: ${id}, successfully`,
        });
      } else {
        res.status(404);
        res.json({
          message: `Retrieve unsuccessful `,
        });
      }
    });
});

//POST item to table - INSERT INTO ExpressShopDB ( product, price, quantity) VALUES ($1::int, $2::text, $3::int, $4::int)
// difference between params and body? could use more explanation
router.post("/cart-items", (req, res) => {
  const {
    params: { id },
    body: { product },
    body: { price },
    body: { quantity },
  } = req;
  pool
    .query(
      "INSERT INTO ExpressShopDB (id, product, price, quantity) VALUES ($1:int, $2::text, $3::int, $4::int)",
      [id, product, price, quantity]
    )
    .then((data) => {
      res.status(201);
      res.json({
        message: "Data Added",
        data: data.rows,
      });
    });
});

//Put - items
router.put("cart-items/:id", (req, res) => {
  const {
    body: { product },
    body: { price },
    body: { quantity },
    params: { id },
  } = req;
  pool
    .query(
      "UPDATE ExpressShopDB set product=$1::text, price=$2::int, quantity=$3::int WHERE id=$4::int",
      [product, price, quantity, id]
    )
    .then((data) => {
      res.status(200);
      res.json({
        message: `Item successfully updated on id: ${id}`,
      });
    });
});

// delete - items
router.delete("tables/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  pool
    .query("DELETE FROM ExpressShopDB WHERE id=$1::int", [id])
    .then((data) => {
      res.status(204);
      res.json({
        message: `${id} Successfully deleted`,
      });
    });
});

// const cartItems = [
//   { id: 1, product: "Shirt: solid", price: 20.0, quantity: 46 },
//   { id: 2, product: "Jeans: dark", price: 35.0, quantity: 20 },
//   { id: 3, product: "Sweater: knit", price: 27.0, quantity: 15 },
//   { id: 4, product: "Jeans: light", price: 37.0, quantity: 18 },
//   { id: 5, product: "Shirt: print", price: 23.0, quantity: 12 },
//   { id: 6, product: "Jacket: leather", price: 50.0, quantity: 23 },
//   { id: 7, product: "Jeans: ripped", price: 40.0, quantity: 30 },
//   { id: 8, product: "Jacket: zip-up", price: 32.0, quantity: 19 },
//   { id: 9, product: "Sweater: cable-knit", price: 26.0, quantity: 10 },
//   { id: 10, product: "Sweater: hooded", price: 1.0079, quantity: 24 },
// ];

// //return an array of all items
// router.get("/cart-items", (req, res) => {
//   res.status(200);
//   res.json(cartItems);
// });

// //push - log the body to console
// router.post("/cart-items", (res, res) => {
//   cartItems.push({
//     id: `${Number(cartItems.length + 1)}`,
//     product: req.body.product,
//     price: req.body.price,
//     quantity: req.body.quantity,
//   });
//   console.log(
//     cartItems.id,
//     cartItems.product,
//     cartItems.price,
//     cartItems.quantity
//   );
//   res.json(cartItems);
// });

// //put - log id and body
// router.put("/cart-items/:id", (req, res) => {
//   const idx = cartItems.indexOf(req.params.id);
//   cartItems.splice(idx, 1, req.body);
//   console.log(idx);
//   console.log(cartItems);
//   res.json(cartItems);
// });

// //delete items - log id param
// router.delete("cart-items/:id", (res, req) => {
//   const idx = cartItems.indexOf(req.params.id);
//   cartItems.splice(idx, 1, req.body);
//   console.log(idx);
//   res.json(cartItems);
// });

module.exports = router;
