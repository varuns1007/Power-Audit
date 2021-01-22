const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", (req, res) => {
  res.send("Welcome");
});
router.post("/createroom", staticController.createRoom);
router.post("/appliance", staticController.createAppliance);

module.exports = router;
