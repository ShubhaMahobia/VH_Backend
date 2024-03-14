const express = require("express");
const { test } = require("../controller/authenticationController");
const router = express.Router();

router.get("/", test);
