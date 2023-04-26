const { urlencoded } = require("express");
const express = require("express");
const router = express.Router();
const app = express();
const { cloudinary } = require("./../cloudinary/index.js");
const Artwork = require("./../models/arts");
const Category = require("./../models/category");
const Sale = require("./../models/sales");
const User = require("./../models/user");
const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports.renderArts = async (req, res, next) => {
  if (req.user) {
    if (req.user.admin == true) {
      admin = true;
      currentUser = true;
    } else {
      currentUser = true;
      admin = undefined;
    }
  } else {
    admin = undefined;
    currentUser = undefined;
  }

  const cats = await Category.find({});
  console.log(currentUser);
  res.render("arts/artgallery", { currentUser, admin, cats });
};

module.exports.newArt = async (req, res, next) => {
  if (req.user) {
    if (req.user.admin == true) {
      admin = true;
      currentUser = true;
    } else {
      currentUser = true;
      admin = undefined;
    }
  } else {
    admin = undefined;
    currentUser = undefined;
  }
  res.render("arts/new", { admin, currentUser });
};

module.exports.showArtwork = async (req, res) => {
  const art = await Artwork.findById(req.params.id);
  const user = req.user;
  if (req.user) {
    if (req.user.admin == true) {
      admin = true;
      currentUser = true;
    } else {
      currentUser = true;
      admin = undefined;
    }
  } else {
    admin = undefined;
    currentUser = undefined;
  }
  if (!art) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/arts");
  }
  res.render("arts/show", { data: { art, user, currentUser, admin } });
};

module.exports.createArtwork = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  req.body.image = {
    url: req.file.path,
    filename: req.file.filename,
  };
  console.log("Before");
  const art = await new Artwork(req.body);
  console.log(art);
  console.log("After");
  await art.save();
  req.flash("success", "Successfully made a new Artwork!");
  res.redirect(`/arts`);
};

module.exports.createCategory = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  req.body.image = {
    url: req.file.path,
    filename: req.file.filename,
  };
  console.log("Before");
  const category = await new Category(req.body);
  console.log(category);
  console.log("After");
  await category.save();
  res.redirect("/arts");
};

module.exports.newCategory = async (req, res, next) => {
  if (req.user) {
    if (req.user.admin == true) {
      admin = true;
      currentUser = true;
    } else {
      currentUser = true;
      admin = undefined;
    }
  } else {
    admin = undefined;
    currentUser = undefined;
  }
  res.render("arts/newcategory", { currentUser, admin });
};

module.exports.payment = async (req, res, next) => {
  console.log("Payment");
  let amount = req.body.amount;

  console.log(amount);
  console.log("payment gateway");
  const instance = new Razorpay({
    key_id: "rzp_test_FMCCYhAfIQ7C1z",
    key_secret: "6r5J9tE1WRjuqz3eNuUxAP9Y",
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
  secret = "6r5J9tE1WRjuqz3eNuUxAP9Y";

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

module.exports.showcat = async (req, res) => {
  if (req.user) {
    if (req.user.admin == true) {
      admin = true;
      currentUser = true;
    } else {
      currentUser = true;
      admin = undefined;
    }
  } else {
    admin = undefined;
    currentUser = undefined;
  }
  const a = req.params.arttype;
  const arts = await Artwork.find({ category: a });
  console.log(arts);
  res.render("arts/showcat", { a, arts, currentUser, admin });
};
