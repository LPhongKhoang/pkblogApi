const router = require("express").Router();
const Fawn = require("fawn");
const config = require("config");
const _ = require("lodash");
const { Post, validate } = require("../models/post");
const { Topic } = require("../models/topic");
const { Menu } = require("../models/menu");
const validateReqBody = require("../utils/validateReqBody");
const { regexEqualIgnorecase } = require("../utils/helper");

const itemsPerPage = config.get("itemsPerPage");
// Handle http request

// Get hot post top 5
router.get("/hot", async (req, res) => {
  const posts = await Post.find()
    .sort("-viewTime title")
    .limit(5)
    .select("title slug -_id");
  res.send(posts);
});

// Get post
router.get("/details/:slug", async (req, res) => {
  const slug = req.params.slug;
  const post = await Post.findOne({ slug: regexEqualIgnorecase(slug) });
  // increase viewTime if post exist (also increase count of post Topic)
  if (post) {
    const results = await Fawn.Task()
      .update("posts", {_id: post._id}, {$inc: {viewTime: 1}})
      .update("topics", {_id: {$in: post.topics}}, {$inc: {count: 1}})
      .run();
  }
  res.send(post);
});

// Get all posts with each filter condition order by "-createDate title"
router.post("/filter", async (req, res) => {
  const page = _.toNumber(req.body.page) || 1;

  const { searchText, tag, type, slug } = req.body;

  let posts = [];
  let filter = {};

  if (searchText) {
    filter = { title: new RegExp(searchText, "i") };
  } else if (tag) {
    filter = { tags: tag };
  } else if (type && slug) {
    if (type === "topic") {
      const topicId = await Topic.findOne({
        slug: regexEqualIgnorecase(slug)
      }).select("_id");
      filter = { topics: topicId };
    } else if (type === "menu") {
      const menuId = await Menu.findOne({
        slug: regexEqualIgnorecase(slug)
      }).select("_id");
      const topics = await Topic.find({ menus: menuId }).select("_id");
      filter = { topics: { $in: topics } };
    } else {
      return res.send("Wrong type");
    }
  }

  const numPosts = await Post.countDocuments(filter);
  const maxPage = Math.ceil(numPosts / itemsPerPage);
  if (page < 1 || page > maxPage) {
    return res.send({ posts: {}, maxPage: 0 });
  }
  posts = await Post.find(filter)
    .sort("-createDate -viewTime title")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .select("-topics -viewTime -content");

  res.send({ posts, maxPage });
});

// Create a menu
router.post("/", async (req, res) => {
  validateReqBody(validate, req.body);

  const post = new Post(
    _.pick(req.body, [
      "title",
      "slug",
      "topics",
      "shortDes",
      "createDate",
      "tags",
      "estimateReadingTime",
      "content"
    ])
  );
  await post.save();
  res.send(_.pick(post, "-_id -content"));
});

module.exports = router;
