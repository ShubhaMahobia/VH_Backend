const express = require("express");
const {
  test,
  signUpPatient,
  isNewUser,
  signUpDoctor,
} = require("../controller/authenticationController");
const router = express.Router();

router.get("/", test);
router.post("/registerPatient", signUpPatient);
router.post("/checkNewUser", isNewUser);
router.post("/registerDoctor", signUpDoctor);

module.exports = router;