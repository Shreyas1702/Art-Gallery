const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const cart = require("../controllers/cart");

router.get("/", isLoggedIn, cart.cartPage);

router.route("/:id").get(isLoggedIn, cart.addItem).delete(cart.deleteItem);

module.exports = router;
