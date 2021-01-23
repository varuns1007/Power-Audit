const express = require("express");
const router = express.Router();
const passport = require('passport');
require('./authenticate');
const staticController = require("../controllers/staticController");
const authController = require('../controllers/authController');

router.get("/", (req, res) => {
  // console.log(req.session)
  res.render("signIn");
});

router.get('/signin/google', passport.authenticate('google', { scope:['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']}));

router.get('/homepage', passport.authenticate('google',{failureRedirect:'/'}),authController.authRedirect );

router.get('/logout',authController.logout);

router.post("/createroom", staticController.createRoom);
router.post("/appliance", staticController.createAppliance);

module.exports = router;
