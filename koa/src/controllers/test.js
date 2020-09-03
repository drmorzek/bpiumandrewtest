// const express = require("express");
// const test = express.Router();
// // var Socket = require('../utils/socket');



// test.get("/test/:id", );

exports.init = ({ api}) => api.post("/test/:id", async (ctx) => {

  // await req.io.sockets.emit("newMessage", {
  //   route: "/test/:id",
  //   text: "From test route",
  //     message: `test ${req.params.id}`,
  //     params: req.params
  // });
  console.log(ctx.req.body)
  ctx.body = {
    message: `test ${ctx.params.id}`,
    params: ctx.params
  };
})
