const express = require("express");
const userPatient = require("../model/UserPatientModel");
const bcrypt = require("bcryptjs");

exports.test = (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Server is running" });
  } catch (error) {
    return res.status(400).json({ message: "Server is not running" });
  }
};
