const express = require("express");
const bcrypt = require("bcryptjs");
const UserDoctor = require("../model/UserDoctorModel");
const UserPatient = require("../model/UserPatientModel");
const Appointment = require("../model/AppointmentModel");
const Document = require("../model/DocumentModel");
const mongoose = require("mongoose");

//Function for generate the Document
exports.uploadDocument = async (req, res) => {
  try {

    //Creating Document Object
    const newDocument= new Document({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      date: req.body.date,
      title:req.body.title,
      description: req.body.description,
      documentLink: req.body.documentLink,
    });
    const DocumentExist = await Document.findOne({
        documentLink: req.body.documentLink,
    });
    // Checking for unique Identification Number for every Document -
    if (DocumentExist) {
      return res.status(400).json({
        success: false,
        message: "Document Already Exist in Database",
      });
    }
    await newDocument.save(); //Saving command for saving Document to database
    return res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function for fetching the Document by ID
exports.getDocumentDetails = async (req, res) => {
  try {
    const documentId = req.params.id; // Extract the Document ID from request parameters

    // Check if Document ID is provided
    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
    }

    // Find the Document by ID
    const document = await Document.findOne({ _id: documentId });

    // Check if document is not found
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "document not found",
      });
    }

    // Find document details using patientId
    const patient = await UserPatient.findOne({
      firebaseUserId: document.patientId,
    });

    // Find doctor details using doctorId
    const doctor = await UserDoctor.findOne({
      firebaseUserId: document.doctorId,
    });

    if (!patient || !doctor) {
      return res.status(404).json({
        success: false,
        message: "Patient or Doctor details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "document details fetched successfully",
      document: {
        date: document.date,
        title:document.title,
        description: document.description,
        meetingLink: document.meetingLink,
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
