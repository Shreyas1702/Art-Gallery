const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  order_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  Buyer: {
    type: Schema.Types.ObjectId,
    required: "User",
  },
});

module.exports = mongoose.model("Sales", SaleSchema);
