const express = require("express");
const bcrypt = require("bcryptjs");
const userPatient = require("../model/UserPatientModel");
const mongoose = require("mongoose");

// Controller function to update patient profile
exports.updatePatientProfile = async (req, res) => {
  try {
    const patientId = req.params.id; // Assuming the ID is passed as a route parameter
    const updates = req.body; // Assuming updates are sent in the request body

    const updatedPatient = await userPatient.findOneAndUpdate(
      { firebaseUserId: patientId }, // Find by firebaseUserId
      updates,
      { new: true }
    );

    if (!updatedPatient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    console.log(updatedPatient);

    return res.status(200).json({
      success: true,
      message: "Patient profile updated successfully",
      data: updatedPatient,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
