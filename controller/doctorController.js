const express = require("express");
const bcrypt = require("bcryptjs");
const userDoctor = require("../model/UserDoctorModel");
const mongoose = require("mongoose");

//Function for fetching all the doctors
exports.fetchAllDoctors = async (req, res) => {
  try {
    const allDoctors = await userDoctor.find({});
    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: allDoctors,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.isDoctorExisit = async (req, res) => {
  try {
    const isUserExist = await userDoctor.findOne({
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


// Function to fetch a doctor by ID (firebaseId)
exports.fetchDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id; // Assuming the ID is passed as a route parameter
    const doctor = await userDoctor.findOne({ firebaseUserId: doctorId }); // Changed to findOne with firebaseUserId
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor details fetched successfully",
      data: doctor,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller function to update doctor profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.id; // Assuming the ID is passed as a route parameter
    const updates = req.body; // Assuming updates are sent in the request body

    const updatedDoctor = await userDoctor.findOneAndUpdate(
      { firebaseUserId: doctorId }, // Find by firebaseUserId
      updates,
      { new: true }
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    console.log(updatedDoctor);

    return res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      data: updatedDoctor,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

