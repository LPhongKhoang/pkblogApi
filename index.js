const winston = require("winston");
const express = require("express");
// Create app server
const app = express();
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
if(process.env.NODE_ENV === "production")
  require("./startup/prod")(app);


// get PORT as environment variable or default
const port = process.env.PORT || 3009;
const server = app.listen(port, () => {
  // winston.info(`Server BlogPK: started at port ${port}`);
  console.log(`Server BlogPK: started at port ${port}`);
  });
module.exports = server;