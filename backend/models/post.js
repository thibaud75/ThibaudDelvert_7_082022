const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
  //   manufacturer: { type: String, required: true },
  //   description: { type: String, required: true },

  //   usersLiked: { type: [String] },
  //   usersDisliked: { type: [String] },
  //   likes: { type: Number, default: 0 },
  //   dislikes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);
