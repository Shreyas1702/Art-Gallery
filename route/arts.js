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
  .post(isLoggedIn, upload.single("image"), arts.createArtwork);

router.post("/pay", arts.payment);
router.post("/pay/verify", arts.verify);
router.post("/pay/save", arts.save);
router.get("/new", isLoggedIn, arts.newArt);
router
  .route("/newcategory")
  .get(isLoggedIn, arts.newCategory)
  .post(upload.single("image"), arts.createCategory);

router.route("/:arttype").get(arts.showcat);

router
  .route("/art/:id")
  .get(isLoggedIn, arts.showArtwork)
  .delete(arts.deleteArtwork);
module.exports = router;
