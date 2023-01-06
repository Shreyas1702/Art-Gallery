const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  purchased: [
    {
      art_id: {
        type: Schema.Types.ObjectId,
        ref: "Arts",
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
