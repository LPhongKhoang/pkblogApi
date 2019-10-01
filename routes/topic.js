const router = require("express").Router();
const _ = require("lodash");
const { Topic, validate } = require("../models/topic");
const validateReqBody = require("../utils/validateReqBody");

// Handle http request

// Get hot (top 6) topics
router.get("/hot", async (req, res) => {
  const topics = await Topic.find()
    .populate("menus")
    .sort("-count name")
    .limit(6);
  res.send(topics);
});

// Create a topic
router.post("/", async (req, res) => {
  validateReqBody(validate, req.body);

  const topic = new Topic(_.pick(req.body, ["name", "menus", "count"]));
  await topic.save();
  res.send(_.pick(topic, ["name", "count"]));
});

module.exports = router;
