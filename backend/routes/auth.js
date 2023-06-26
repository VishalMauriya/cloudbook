const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "vishal&";

// Create user using API : POST "/api/auth/createuser" No Login required
router.post(
  "/createUser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 5 }),
  async (req, res) => {
    let success = false;
    // If there are errors, return BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: success, error: "Sorry, a user with this email already exists!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success: success, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Occured!");
    }
  }
);

// Authenticate user using API : POST "/api/auth/login" No Login required
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    let success = false;
    // If there are errors, return BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success: success, error: "Username or Password is wrong!" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res
          .status(400)
          .json({ success: success, error: "Username or Password is wrong!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success: success, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Occured!");
    }
  }
);

// Get Loggedin user details using API : POST "/api/auth/getUser"  Login required
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    let user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Occured!");
  }
});

module.exports = router;
