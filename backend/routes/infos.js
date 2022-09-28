const express = require("express");
const router = express.Router();

const infosCtrl = require("../controllers/infos");

router.post("/", infosCtrl.getOneInfo);

module.exports = router;
