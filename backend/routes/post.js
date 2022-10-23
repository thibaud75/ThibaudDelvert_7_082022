const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);
router.get("/:id", postCtrl.getOnePost);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;
