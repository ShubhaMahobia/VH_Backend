const express = require("express");
const bcrypt = require("bcryptjs");
const UserDoctor = require("../model/UserDoctorModel");
const UserPatient = require("../model/UserPatientModel");
const Appointment = require("../model/AppointmentModel");
const Prescription = require("../model/PrescriptionModel");
const mongoose = require("mongoose");

//Function for generate the Prescription
exports.generatePrecription = async (req, res) => {
  try {

    //Creating Prescription Object
    const newPrescription = new Prescription({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      documentId: req.body.documentId,
      date: req.body.date,
      title:req.body.title,
      description: req.body.description,
      documentLink: req.body.documentLink,
    });
    const prescriptionExist = await Prescription.findOne({
        documentLink: req.body.documentLink,
    });
    // Checking for unique Identification Number for every Prescription -
    if (prescriptionExist) {
      return res.status(400).json({
        success: false,
        message: "Prescription Number Already Exist in Database",
      });
    }
    await newPrescription.save(); //Saving command for saving apointments to database
    return res.status(200).json({
      success: true,
      message: "Prescription Generated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function for fetching the prescription by ID
exports.getPrescriptionDetails = async (req, res) => {
  try {
    const prescriptionId = req.params.id; // Extract the prescription ID from request parameters

    // Check if prescription ID is provided
    if (!prescriptionId) {
      return res.status(400).json({
        success: false,
        message: "prescription ID is required",
      });
    }

    // Find the prescription by ID
    const prescription = await Prescription.findOne({ _id: prescriptionId });

    // Check if prescription is not found
    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "prescription not found",
      });
    }

    // Find patient details using patientId
    const patient = await UserPatient.findOne({
      firebaseUserId: prescription.patientId,
    });

    // Find doctor details using doctorId
    const doctor = await UserDoctor.findOne({
      firebaseUserId: prescription.doctorId,
    });

    if (!patient || !doctor) {
      return res.status(404).json({
        success: false,
        message: "Patient or Doctor details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "prescription details fetched successfully",
      prescription: {
        date: prescription.date,
        title:prescription.title,
        description: prescription.description,
        meetingLink: prescription.meetingLink,
        patient: patient,
        doctor: doctor,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
