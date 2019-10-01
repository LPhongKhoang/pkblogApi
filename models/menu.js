const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  order: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
});


const Menu = mongoose.model("Menu", menuSchema);

// function validate data on request
function validate(menu) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    order: Joi.number()
      .min(1)
      .max(10)
      .required()
  });
  return schema.validate(menu);
}

exports.Menu = Menu;
exports.menuSchema = menuSchema;
exports.validate = validate;