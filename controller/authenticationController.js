const express = require("express");
const userPatient = require("../model/UserPatientModel");
const bcrypt = require("bcryptjs");
const userDoctor = require("../model/UserDoctorModel");
const mongoose = require('mongoose');


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
}
//This is the create Profile Function for the user(Doctor)
exports.signUpDoctor = async (req, res) => {
  try {

    //Here we are saving the identification number in encrypted form so that it will be secured in our database
    const identificationNumber = req.body.identificationNumber;
    const hashedIdentificationNumber = await bcrypt.hash(
      identificationNumber,
      12
    );

  //Creating Doctor Object 
    const doctor = new userDoctor({
      firebaseUserId: req.body.firebaseUserId,
      firstName: req.body.firstName,
      LastName: req.body.lastName,
      Email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      Experience: req.body.experience,
      SpecializedField: req.body.specializedField,
      gender: req.body.gender,
      identificationNumber: hashedIdentificationNumber,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    const userExist = await userDoctor.findOne({
      identificationNumber: req.body.identificationNumber,
    });
    // Checking for unique Identification Number for every user -
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Identification Number Already Exist in Database",
      });
    }
    await doctor.save(); //Saving command for saving user to database
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
}

//Login Fuction for fetching user details 
exports.fetchUserDetails=  async (req, res) => {
  try { 
    const email=req.body.email;
    if( email==null){
      return res.status(400).json({ success:false ,message:"Please provide an email"});
    }
   else{
    const user=await userPatient.findOne({Email:email});
   if(!user){
    return res.status(401).json({success:false,message:"Authentication failed! Email not found."});
   }
   else{
    return res.status(401).json({success:true,data: user, message:"User success"});
   }
   }


  } catch (err) {
    return res.status(500).json({success:false,message:"Internal Server Error"});

  }
}

