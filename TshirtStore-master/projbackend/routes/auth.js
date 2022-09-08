var express = require('express')
var router = express.Router()
const { check, validationResult } = require("express-validator");
const {signup,signout,signin, isSignedIn}= require("../controllers/auth.js");

router.post("/signup", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 1 })
  ],signup)


router.get("/signout",signout);

router.post("/signin", [
  check("email", "email is required").isEmail(),
  check("password", "password should be at least 3 char").isLength({ min: 3 })
],signin)

router.get("/testroute",isSignedIn, (req, res) => {
  res.send("A Protected route");
})

module.exports = router;