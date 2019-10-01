const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  menus: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Menu" }
  ],
  count: {
    type: Number,
    min: 0,
    default: 0
  }
});

const Topic = mongoose.model("Topic", topicSchema);

// function validate data on request
function validate(topic) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    menus: Joi.array().items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    ),
    count: Joi.number().min(0)
  });
  return schema.validate(topic);
}

exports.Topic = Topic;
exports.topicSchema = topicSchema;
exports.validate = validate;
