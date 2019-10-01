
const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = function() {

  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtException.log" })
  );
  // Subscribe to "uncaughtException" event: Exception in asynchronous
  process.on("unhandledRejection", ex => {
    throw ex; 
  });

  // Add transport File
  winston.add(new winston.transports.File({ filename: "logfile.log" }));

};
