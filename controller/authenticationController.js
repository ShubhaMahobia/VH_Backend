const express = require("express");
const userPatient = require("../model/UserPatientModel");
const bcrypt = require("bcryptjs");
const userDoctor = require("../model/UserDoctorModel");
const mongoose = require("mongoose");
const Schedule = require("../model/timeslotModel");

//This is a test function to check is the server is running or not.
exports.test = (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Server is running" });
  } catch (error) {
    return res.status(400).json({ message: "Server is not running" });
  }
};

//This is the API to check if the user is already registered or not in our system.
exports.isPatientExist = async (req, res) => {
  try {
    const isUserExist = await userPatient.findOne({
      firebaseUserId: req.body.firebaseUserId,
    });
    if (isUserExist) {
      return res.status(400).json({ success: true, isPresent: true });
    } else {
      return res.status(200).json({ success: true, isPresent: false });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//This is the create Profile Function for the user(Patient)
exports.signUpPatient = async (req, res) => {
  try {
    //Here we are saving the identification number in encrypted form so that it will be secured in our database
    const identificationNumber = req.body.identificationNumber;
    const hashedIdentificationNumber = await bcrypt.hash(
      identificationNumber,
      12
    );

    //Creating patient Object
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
      userType: "patient",
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
    await patient.save(); //Saving command for saving user to database
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
//This is the create Profile Function for the user(Doctor)
exports.signUpDoctor = async (req, res) => {
  try {
    const doctor = new userDoctor({
      firebaseUserId: req.body.firebaseUserId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      experience: req.body.experience,
      specializedField: req.body.specializedField,
      gender: req.body.gender,
      startTimeHour: req.body.startTimeHour,
      endTimeHour: req.body.endTimeHour,
      profilePicture: req.body.profilePicture,
      address: req.body.address,
      degree: req.body.degree,
      breifDescription: req.body.breifDescription,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      userType: "doctor",
    });
    //Checking is user already exist in database or not
    const userExist = await userDoctor.findOne({
      firebaseUserId: req.body.firebaseUserId,
    });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist in Database",
      });
    }

    const timeSlots = [];
    if (req.body.startTimeHour < 10) {
      req.body.startTimeHour = "0" + req.body.startTimeHour;
    }
    if (req.body.endTimeHour < 10) {
      req.body.endTimeHour = "0" + req.body.endTimeHour;
    }
    const startHour = new Date(`2024-01-01T${req.body.startTimeHour}:00Z`);
    const endHour = new Date(`2024-01-01T${req.body.endTimeHour}:00Z`);
    let currentTime = new Date(startHour);
    while (currentTime < endHour) {
      const startTime = new Date(currentTime);
      const endTime = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes later
      timeSlots.push({ startTime, endTime });
      currentTime = new Date(currentTime.getTime() + 30 * 60000);
    }
    const schedule = new Schedule({
      docId: req.body.firebaseUserId,
      timeSlots: timeSlots,
      daysAvailable: req.body.daysAvailable,
    });
    await doctor.save(); //Saving command for saving user to database
    await schedule.save();
    return res.status(200).json({
      success: true,
      message: "Doctor Profile Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Login Fuction for fetching user Patient details
exports.fetchUserDetails = async (req, res) => {
  try {
    const userID = req.body.id;
    if (userID == null) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an id" });
    } else {
      const user = await userPatient.findOne({ firebaseUserId: userID });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed! Email not found.",
        });
      } else {
        return res
          .status(401)
          .json({ success: true, data: user, message: "User success" });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Login Fuction for fetching user Doctor details
exports.fetchDoctorDetails = async (req, res) => {
  try {
    const docid = req.body.id;
    if (docid == null) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an id" });
    } else {
      const doctor = await userDoctor.findOne({ firebaseUserId: docid });
      if (!doctor) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed! Email not found.",
        });
      } else {
        return res
          .status(401)
          .json({ success: true, data: doctor, message: "User success" });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
