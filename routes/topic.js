const router = require("express").Router();
const _ = require("lodash");
const { Topic, validate } = require("../models/topic");
const validateReqBody = require("../utils/validateReqBody");

// Handle http request

// Get all topics
router.get("/", async (req, res) => {
  const topics = await Topic.find()
    .populate("menus", "name -_id")
    .sort("-count name");
  res.send(topics);
});

// Get hot (top 6) topics
router.get("/hot", async (req, res) => {
  const topics = await Topic.find()
    .sort("-count name")
    .limit(6)
    .select("name slug -_id");
  res.send(topics);
});

// Create a topic
router.post("/", async (req, res) => {
  validateReqBody(validate, req.body);

  const topic = new Topic(_.pick(req.body, ["name", "slug", "menus", "count"]));
  await topic.save();
  res.send(_.pick(topic, ["name", "slug", "count"]));
});

module.exports = router;
