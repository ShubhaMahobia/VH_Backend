const mongoose = require("mongoose");

const DoctorUserSchema = new mongoose.Schema({
  firebaseUserId: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  specializedField: {
    type: String,
    required: true,
  },

  startTimeHour: {
    type: String,
    required: true,
  },

  endTimeHour: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: true,
  },

  degree: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  breifDescription: {
    type: String,
    required: true,
  },
  //Adding these field to save exact address of the user by their location and we can update if we want in future.
  longitude: {
    type: String,
    required: false,
  },
  latitude: {
    type: String,
    required: false,
  },
});

const userDoctor = mongoose.model("userDoctor", DoctorUserSchema);

module.exports = userDoctor;
