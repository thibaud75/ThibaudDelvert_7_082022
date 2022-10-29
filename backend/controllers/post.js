const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  console.log(req.body.post);
  console.log(req.file.filename);
  const postObject = JSON.parse(req.body.post);
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
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyPost = (req, res, next) => {
  // console.log(req.params.id);
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  console.log(postObject);
  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // if (post.userId != req.auth.userId) {
      //   res.status(401).json({ message: "Not authorized" });
      // } else {
      Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Objet modifié!" }))
        .catch((error) => res.status(401).json({ error }));
      // }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // if (post.userId != req.auth.userId) {
      //   res.status(401).json({ message: "Not authorized" });
      // } else {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      });
      // }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likePost = (req, res, next) => {
  console.log(req.body.like);
  console.log(req.params.id);
  if (req.body.like === 1) {
    console.log("j'aime");
    Post.findOne({ _id: req.params.id }).then((post) => {
      post.likes = post.likes + 1;
      // j'augmente le nombre de like
      // ajouter l'id de l'utilisateur à la liste des gens qui aiment
      post.usersLiked.push(req.body.userId);
      // post.usersLiked.push(req.auth.userId);
      console.log(req.body.userId);
      post
        .save()
        .then(() => {
          res.status(200).json({ message: "Like enregistré" });
        })
        .catch((error) => res.status(401).json({ error }));
    });
  }
  if (req.body.like === 0) {
    console.log("neutre");
    // commencer par savoir ou on était avant : si on était dans les likes OU dislikes
    // obligatoirmeent dans l'un ou dans l'autre

    // pour les likes:
    Post.findOne({ _id: req.params.id }).then((result) => {
      if (result.usersLiked.includes(req.body.userId)) {
        Post.findOne({ _id: req.params.id }).then((post) => {
          post.likes = post.likes - 1;
          console.log(post.usersLiked);
          const deleteId = post.usersLiked.filter(
            (el) => el !== req.body.userId
          );
          console.log(deleteId);
          post.usersLiked = deleteId;
          post
            .save()
            .then(() => {
              res.status(200).json({ message: "Like retiré" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    });
  }
};
