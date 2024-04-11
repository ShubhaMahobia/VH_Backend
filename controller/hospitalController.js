const express = require("express");
const bcrypt = require("bcryptjs");
const UserDoctor = require("../model/UserDoctorModel");
const UserPatient = require("../model/UserPatientModel");
const Appointment = require("../model/AppointmentModel");
const Hospital = require("../model/HospitalModel");
const mongoose = require("mongoose");
const geolib = require("geolib");

//Function for Booking the Hospital
exports.addHospital = async (req, res) => {
  try {
    //Creating Hospital Object
    const newHospital = new Hospital({
      name: req.body.name,
      rating: req.body.rating,
      hours: req.body.hours,
      address: req.body.address,
      phone: req.body.phone,
      description: req.body.description,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      imageLink: req.body.imageLink,
      noOfBed: req.body.noOfBed,
      specilization: req.body.specilization,
      browserLink: req.body.browserLink,
    });
    const hospitalExist = await Hospital.findOne({
      address: req.body.address,
    });
    // Checking for unique Identification Number for every Hospital -
    if (hospitalExist) {
      return res.status(400).json({
        success: false,
        message: "Identification Number Already Exist in Database",
      });
    }
    await newHospital.save(); //Saving command for saving Hospital to database
    return res.status(200).json({
      success: true,
      message: "Hospital added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function for fetching the Hospital by ID
exports.getAllHospitalDetails = async (req, res) => {
  try {
    // Find the All Hospital
    const hospitals = await Hospital.find();

    // Check if Hospital is not found
    if (!hospitals) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hospital details fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function for fetching the Hospital by ID
exports.getHospitalDetails = async (req, res) => {
  try {
    const hospitalId = req.params.id; // Extract the Hospital ID from request parameters

    // Check if Hospital ID is provided
    if (!hospitalId) {
      return res.status(400).json({
        success: false,
        message: "Hospital ID is required",
      });
    }

    // Find the Hospital by ID
    const hospital = await Hospital.findOne({ _id: hospitalId });

    // Check if Hospital is not found
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hospital details fetched successfully",
      hospital: {
        name: hospital.name,
        rating: hospital.rating,
        hours: hospital.hours,
        address: hospital.address,
        phone: hospital.phone,
        description: hospital.description,
        longitude: hospital.longitude,
        latitude: hospital.latitude,
        imageLink: hospital.imageLink,
        noOfBed: hospital.noOfBed,
        specilization: hospital.specilization,
        browserLink: hospital.browserLink,
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

//function to fetch hospitals based on patient latitude and longitude
exports.fetchHospitalsByLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body; // Assuming latitude and longitude are passed in the request body
    const radius = req.query.radius || 10000; // Default radius of 10km, can be overridden in query parameter

    // Fetch all hospitals from the database
    const hospitals = await Hospital.find();

    // If latitude and longitude are provided, filter hospitals based on distance from patient's location
    if (latitude && longitude) {
      const nearbyHospitals = hospitals.filter((hospital) => {
        const hospitalLocation = {
          latitude: hospital.latitude,
          longitude: hospital.longitude,
        };
        const distance = geolib.getDistance(
          { latitude, longitude },
          hospitalLocation
        );
        return distance <= radius;
      });
      res.json(nearbyHospitals);
    } else {
      // If latitude and longitude are not provided, return all hospitals
      res.json(hospitals);
    }
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
