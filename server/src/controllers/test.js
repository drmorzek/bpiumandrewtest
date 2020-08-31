const express = require("express");
const test = express.Router();
// var Socket = require('../utils/socket');



test.get("/test/:id", (req, res) => {

    process.send({
      emit: "newMessage",
      text: "From test route",
      message: `test ${req.params.id}`,
      params: req.params
    })
    res.json({
        message: `test ${req.params.id}`,
        params: req.params

    });

});

module.exports = test;
