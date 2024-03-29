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
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  
  Experience: {
    type: String,
    required: true,
  },

  SpecializedField: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  identificationNumber: {
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
