const express = require("express");
const router = express.Router();
const passport = require("passport");
require("./authenticate");
const staticController = require("../controllers/staticController");
const authController = require("../controllers/authController");
const Room = require("../models/Room");
const Appliance = require("../models/Appliance");
const { static } = require("express");

router.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/" }),
  authController.authRedirect
);

router.get("/homepage", async (req, res) => {
  // res.render("homepage");
  // console.log(req.session)
  let rooms;
  await Room.find({})
    .then((result) => {
      rooms = result;
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("landingPage", { rooms: rooms });
});

router.get(
  "/signin/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get("/weeklyreport", staticController.weeklyreportPage);

router.get("/logout", authController.logout);

router.post("/createroom", staticController.createRoom);
router.post("/addNewAppliance", staticController.createAppliance);

router.get("/appliancelist", staticController.getApplianceList);

router.get("/getroomslist/:filter", staticController.getRoomsList);

router.get("/getroom/:roomId", staticController.getRoom);

router.post("/deleteroom", staticController.deleteRoom);

router.post("/deleteappliance", staticController.deleteAppliance);

// router.get("/createWeeklyReport", staticController.createWeeklyReport);

// router.get('/search',staticController.search);

module.exports = router;
