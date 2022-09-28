const mongoose = require("mongoose");

const infosSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  password: { type: String, required: true },
  prenom: { type: String, required: true },
});

module.exports = mongoose.model("Infos", infosSchema);
