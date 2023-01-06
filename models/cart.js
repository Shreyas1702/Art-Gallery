const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  art_id: {
    type: Schema.Types.ObjectId,
    ref: "Arts",
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
