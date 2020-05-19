const mongoose = require("mongoose");
const Fawn = require("fawn");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  // Setup connection to MongoDB
  let db = config.get("db");
  if (["production"].includes(process.env.NODE_ENV)) {
    const dbUsername = config.get("dbUsername");
    const dbUserPassword = config.get("dbUserPassword");
    db = db.replace("<username>", dbUsername);
    db = db.replace("<password>", dbUserPassword);
  }

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      // winston.info(`Connected to ${db}...`);
      console.log(`Connected to ${db}...`);
    })
    .catch((err) => {
      console.error("Cannot connect to db");
    });
  Fawn.init(mongoose);
};

/*
  mongodb://<username>:<password>@<host_name>/<db_name>
*/
