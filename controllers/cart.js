const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const Artwork = require("../models/art");
const Sale = require("../models/sale");
const User = require("../models/user");

const Cart = require("../models/cart");

module.exports.cartPage = async (req, res, next) => {
  const cart = await Cart.find({});
  var i = 0;
  const arts = [];
  const ids = [];
  while (i < cart.length) {
    const id = cart[i].art_id;
    const data = await Artwork.findById(id);
    arts.push(data);
    ids[i] = cart[i]._id;
    i++;
  }
  data = {
    arts,
    ids,
  };
  res.render("arts/cart", { data });
};

module.exports.addItem = async (req, res, next) => {
  const artid = req.params.id;
  var art_id = mongoose.Types.ObjectId(artid);
  const id = { art_id };
  const cart = new Cart(id);
  cart.save();
  res.redirect("/arts");
};

module.exports.deleteItem = async (req, res, next) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.redirect("/cart");
};
