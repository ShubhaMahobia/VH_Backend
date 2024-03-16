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

exports.isNewUser = async (req, res) => {
  try {
    const isUserExist = await userPatient.findOne({
      firebaseUserId: req.body.firebaseUserId,
    });
    if (isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "User is Present in Database" });
    } else {
      return res.status(200).json({ success: true, message: "User is new" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.signUpPatient = async (req, res) => {
  try {
    const identificationNumber = req.body.identificationNumber;
    const hashedIdentificationNumber = await bcrypt.hash(
      identificationNumber,
      12
    );

    const patient = new userPatient({
      firebaseUserId: req.body.firebaseUserId,
      firstName: req.body.firstName,
      LastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      Email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      identificationNumber: hashedIdentificationNumber,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    const userExist = await userPatient.findOne({
      identificationNumber: req.body.identificationNumber,
    });
    // Checking for unique Identification Number for every user -
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Identification Number Already Exist in Database",
      });
    }

    await patient.save();
    return res.status(200).json({
      success: true,
      message: "User data saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};  
