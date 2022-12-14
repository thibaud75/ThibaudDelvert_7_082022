const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String },
  auteur: { type: String, required: true },
  timestamp: { type: Number },
  usersLiked: { type: [String] },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);
