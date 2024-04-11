const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: true,
  },

  hours: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  longitude: {
    type: String,
    required: true,
  },

  latitude: {
    type: String,
    required: true,
  },

  imageLink:{
    type: String,
    required: true,
  },

  noOfBed:{
    type: String,
    required: true,
  },
  specilization:{
    type:[String] ,
    required:true,
  },

  browserLink:{
    type: String,
    required: true,
  }
});

const hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = hospital;
