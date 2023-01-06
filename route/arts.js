const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./../middleware");
const arts = require("./../controllers/arts");
const multer = require("multer");
const { storage } = require("./../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(arts.renderArts)
  .post(isLoggedIn, upload.array("image"), arts.createArtwork);

router.post("/pay", arts.payment);
router.post("/pay/verify", arts.verify);
router.post("/pay/save", arts.save);
router.get("/new", isLoggedIn, arts.newArt);

router
  .route("/:id")
  .get(isLoggedIn, arts.showArtwork)
  .delete(arts.deleteArtwork);
module.exports = router;
