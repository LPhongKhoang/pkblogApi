const express = require("express");
const morgan = require("morgan");

// import Routers
// ...
const menuRoute = require("../routes/menu");
const topicRoute = require("../routes/topic");
const postRoute = require("../routes/post");
const loginCallBackRoute = require("../routes/loginCallback");

// import function catch error
const error = require("../middleware/error");

// Export function
module.exports = function (app) {
  //use middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("short"));
  app.use(express.static("public"));

  // api end point
  app.use("/api/menu", menuRoute);
  app.use("/api/topic", topicRoute);
  app.use("/api/post", postRoute);
  app.use("/api/login/callback", loginCallBackRoute);
  // ....
  app.use("/", (req, res) => res.send("xxx PK xxx"));
  // catch error in express pipeline
  app.use(error);
};
