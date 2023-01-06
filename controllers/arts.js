const { urlencoded } = require("express");
const express = require("express");
const router = express.Router();
const app = express();
const { cloudinary } = require("../cloudinary/index.js");
const Artwork = require("../models/art");
const Sale = require("../models/sale");
const User = require("../models/user");
const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports.renderArts = async (req, res, next) => {
  const arts = await Artwork.find({});
  res.render("arts/artgallery", { arts });
};

module.exports.newArt = async (req, res, next) => {
  res.render("arts/new");
};

module.exports.showArtwork = async (req, res) => {
  const art = await Artwork.findById(req.params.id);
  const user = req.user;
  if (!art) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/arts");
  }
  res.render("arts/show", { data: { art, user } });
};

module.exports.createArtwork = async (req, res, next) => {
  const art = new Artwork(req.body.art);
  console.log(
    req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }))
  );
  art.image = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  console.log("Before");
  console.log(art.image);
  console.log("After");
  await art.save();
  req.flash("success", "Successfully made a new Artwork!");
  res.redirect(`/arts`);
};

module.exports.payment = async (req, res, next) => {
  console.log("Payment");
  let amount = req.body.amount;

  console.log(amount);

  const instance = new Razorpay({
    key_id: "rzp_test_qRDkDR3xC7u8U6",
    key_secret: "AbRSBHopa1XtKRaxYGoQMy4d",
  });

  const order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  });

  res.status(201).json({
    success: true,
    order,
  });
};

module.exports.save = async (req, res, next) => {
  console.log(req.body.data);
  const data = req.body.data;
  const art = await Artwork.findById(data.id);
  const sale = new Sale(req.body.data);
  const user = await User.findById(req.user.id);
  console.log(data.amount);
  const data1 = {
    art_id: data.id,
    amount: data.amount,
  };
  user.purchased.push(data1);
  sale.Buyer = req.user.id;
  art.soldTo = req.user.id;
  art.sold = true;
  await art.save();
  await user.save();
  await sale.save();
  res.send(art);
};

module.exports.verify = async (req, res) => {
  console.log("verification");
  console.log(req.body.data);
  const data = req.body.data;
  razorpay_payment_id = data.razorpay_payment_id;
  order_id = data.order_id;
  razorpay_signature = data.signature;
  secret = "AbRSBHopa1XtKRaxYGoQMy4d";

  console.log(order_id);
  console.log(razorpay_payment_id);

  body = order_id + "|" + razorpay_payment_id;
  body = body.toString();
  var expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  console.log(expectedSignature);
  console.log(razorpay_signature);
  if (expectedSignature === razorpay_signature) {
    console.log("payment is successful");
  } else {
    console.log("not");
  }

  console.log("razorpay");

  res.status(200).json({
    success: true,
  });
};

module.exports.deleteArtwork = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Artwork.findByIdAndDelete(id);
  res.redirect("/arts");
};
