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
  author: { type: String, default: "634aaa29c1b84f9f41b4b3f2" },
});

module.exports = mongoose.model("Arts", ArtSchema);
