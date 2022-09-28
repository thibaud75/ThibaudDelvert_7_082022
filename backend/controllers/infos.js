const Infos = require("../models/infos");
const infos = require("../models/infos");
const fs = require("fs");

exports.getOneInfo = (req, res, next) => {
  Infos.findOne({
    _id: req.params.id,
  })
    .then((infos) => {
      res.status(200).json(infos);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
