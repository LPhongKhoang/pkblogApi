const winston = require("winston");

module.exports = function(err, req, res, next) {
  // winston.error(err.message, err);
  console.error(err.message);
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message
    }
  });
}