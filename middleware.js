const { artworkSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.originalUrl);
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateArtwork = (req, res, next) => {
  const { error } = artworkSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
