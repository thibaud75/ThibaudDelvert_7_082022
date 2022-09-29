const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  password: { type: String, required: true },
  prenom: { type: String, required: true },
  photo: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
