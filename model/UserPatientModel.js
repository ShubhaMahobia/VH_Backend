const mongoose = require("mongoose");

const PatientUserSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  identificationNumber: {
    type: String,
    required: true,
  },
});

const UserPatient = mongoose.model("userPatient", PatientUserSchema);

module.exports = UserPatient;
