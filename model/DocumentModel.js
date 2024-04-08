const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: false,
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

  documentLink: {
    type: String,
    required: true,
  },
});

const document = mongoose.model("Document", DocumentSchema);

module.exports = document;
