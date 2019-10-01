const router = require("express").Router();
const _ = require("lodash");
const { Menu, validate } = require("../models/menu");
const validateReqBody = require("../utils/validateReqBody");


// Handle http request

// Get all menus 
router.get("/", async (req, res) => {
  const menus = await Menu.find().sort('order -name');
  res.send(menus);
});

// Create a menu
router.post("/", async (req, res) => {
  validateReqBody(validate, req.body);

  const menu = new Menu(_.pick(req.body, ["name", "order"]));
  await menu.save();
  res.send(menu);
});

module.exports = router;



