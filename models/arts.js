const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const opts = { toJSON: { virtuals: true } };

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const ArtSchema = new Schema({
  title: String,
  image: [ImageSchema],
  name: String,
  price: Number,
  description: String,
  location: String,
  category: {
    type: String,
    enum: ["Potrait", "Landscape", "Abstract"],
    required: [true, "Type of the Category should be mentioned"],
  },
  sold: {
    type: Boolean,
    default: false,
  },
  soldTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  author: { type: String, default: "643055223d4f51e406963e23" },
});

module.exports = mongoose.model("Art", ArtSchema);
