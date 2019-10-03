const router = require("express").Router();
const _ = require("lodash");
const { Post, validate } = require("../models/post");
const { Topic } = require("../models/topic");
const validateReqBody = require("../utils/validateReqBody");

// Handle http request
// all post

// Get all posts order by
router.post("/filter", async (req, res) => {
  const page = req.body.page || 1;

  const { searchText, tag, type, id } = req.body;

  let posts = [];
  let p = Post.find();
  p.exec()

  if (searchText) {
    posts = await Post.find({ title: new RegExp(searchText, "i") }).sort(
      "-createDate title"
    );
  } else if (tag) {
    posts = await Post.find({ tags: tag }).sort("-createDate title");
  } else if (type && id) {
    if (type === "topic") {
      posts = await Post.find({ topics: id }).sort("-createDate title");
    } else if (type === "menu") {
      const topics = await Topic.find({ menus: id }).select("_id");

      posts = await Post.find({ topics: { $all: topics } }).sort(
        "-createDate title"
      );
    }
  } else {
    posts = await Post.find().sort("-createDate title");
  }

  res.send(posts);
});

// Create a menu
router.post("/", async (req, res) => {
  validateReqBody(validate, req.body);

  const post = new Post(
    _.pick(req.body, [
      "title",
      "topics",
      "shortDes",
      "createDate",
      "tags",
      "estimateReadingTime",
      "content"
    ])
  );
  await post.save();
  res.send(post);
});

module.exports = router;
