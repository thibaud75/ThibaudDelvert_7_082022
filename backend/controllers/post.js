const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  console.log(postObject);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Post enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
