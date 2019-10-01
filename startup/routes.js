const express = require("express");

// import Routers
// ...
const menuRoute = require("../routes/menu");
const topicRoute = require("../routes/topic");


// import function catch error
const error = require("../middleware/error");

// Export function
module.exports = function(app) {
  //use middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(express.static("public"));
  

  // api end point
  app.use("/api/menu", menuRoute);
  app.use("/api/topic", topicRoute);
  // ....
  app.use("/", (req, res)=>res.send("xxx PK xxx"));
  // catch error in express pipeline
  app.use(error);
}