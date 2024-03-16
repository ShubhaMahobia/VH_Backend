const express = require("express");
const {
  test,
  signUpPatient,
  isNewUser,
} = require("../controller/authenticationController");
const router = express.Router();

router.get("/", test);
router.post("/registerPaitent", signUpPatient);
router.post("/checkNewUser", isNewUser);

module.exports = router;