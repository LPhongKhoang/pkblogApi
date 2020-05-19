const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  let target;
  if (process.env.LOG2FILE) {
    target = new winston.transports.File({ filename: "uncaughtException.log" });
  } else {
    target = new winston.transports.Console();
  }
  winston.exceptions.handle(target);
  // Subscribe to "uncaughtException" event: Exception in asynchronous
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // Add transport File
  // winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
