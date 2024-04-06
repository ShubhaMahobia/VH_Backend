const express = require("express");
const bcrypt = require("bcryptjs");
const UserDoctor = require("../model/UserDoctorModel");
const UserPatient = require("../model/UserPatientModel");
const Appointment = require("../model/AppointmentModel");
const mongoose = require("mongoose");

//Function for Booking the appointment
exports.bookAppointment = async (req, res) => {
  try {
    //Here we are saving the identification number in encrypted form so that it will be secured in our database
    const identificationNumber = req.body.identificationNumber;
    const hashedIdentificationNumber = await bcrypt.hash(
      identificationNumber,
      12
    );

    //Creating appointment Object
    const newAppointment = new Appointment({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      timeSlot: req.body.timeSlot,
      day: req.body.day,
      description: req.body.description,
      identificationNumber: hashedIdentificationNumber,
      meetingLink: req.body.meetingLink,
    });
    const appointmentExist = await Appointment.findOne({
      identificationNumber: req.body.identificationNumber,
    });
    // Checking for unique Identification Number for every appointment -
    if (appointmentExist) {
      return res.status(400).json({
        success: false,
        message: "Identification Number Already Exist in Database",
      });
    }
    await newAppointment.save(); //Saving command for saving apointments to database
    return res.status(200).json({
      success: true,
      message: "Appointment Booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function for fetching the appointment by ID
exports.getAppointmentDetails = async (req, res) => {
  try {
    const appointmentId = req.params.id; // Extract the appointment ID from request parameters

    // Check if appointment ID is provided
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    // Find the appointment by ID
    const appointment = await Appointment.findOne({ _id: appointmentId });

    // Check if appointment is not found
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Find patient details using patientId
    const patient = await UserPatient.findOne({
      firebaseUserId: appointment.patientId,
    });

    // Find doctor details using doctorId
    const doctor = await UserDoctor.findOne({
      firebaseUserId: appointment.doctorId,
    });

    if (!patient || !doctor) {
      return res.status(404).json({
        success: false,
        message: "Patient or Doctor details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment details fetched successfully",
      message: "Appointment details fetched successfully",
      appointment: {
        _id: appointment._id,
        timeSlot: appointment.timeSlot,
        day: appointment.day,
        description: appointment.description,
        meetingLink: appointment.meetingLink,
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
