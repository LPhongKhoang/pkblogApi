const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 60
  },
  slug: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
  shortDes: {
    type: String,
    required: true,
    min: 20,
    max: 150
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  viewTime: {
    type: Number,
    min: 0,
    default: 0
  },
  tags: [{ type: String, min: 2, max: 16, required: true }],
  estimateReadingTime: {
    type: Number,
    required: true,
    min: 1,
    max: 40
  },
  content: {
    type: String,
    required: true,
    minlength: 50
  }
});

let Post;

try {
  Post = mongoose.model("Post");
} catch (error) {
  Post = mongoose.model("Post", postSchema);
}

// function validate data on request
function validate(post) {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(60)
      .required(),
    topics: Joi.array().items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    ).required(),
    shortDes: Joi.string()
      .min(20)
      .max(350)
      .required(),
    createDate: Joi.date(),
    tags: Joi.array()
      .items(
        Joi.string()
          .min(2)
          .max(16)
          .required()
      )
      .required(),
    estimateReadingTime: Joi.number()
      .min(1)
      .max(40)
      .required(),
    content: Joi.string()
        .min(50)
        .required()
  });
  return schema.validate(post);
}

exports.Post = Post;
exports.postSchema = postSchema;
exports.validate = validate;
