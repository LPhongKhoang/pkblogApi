const config = require("config");

module.exports = function() {
  if (process.env.NODE_ENV === "production") {
    
    if (!config.get("jwtSecretKey")) {
      throw new Error("FATAL ERROR: pkblog_jwtSecretKey is not set"); // longpkprojwt@1
    }
    if (!config.get("dbUsername")) {
      throw new Error("FATAL ERROR: pkblog_db_user_name is not set");
    }
    if (!config.get("dbUserPassword")) {
      throw new Error("FATAL ERROR: pkblog_db_user_password is not set");
    }
  }
};
