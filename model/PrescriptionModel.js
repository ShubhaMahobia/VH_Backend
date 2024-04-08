const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },

  documentLink: {
    type: String,
    required: true,
  },
});

const prescription = mongoose.model("Prescription", PrescriptionSchema);

module.exports = prescription;
