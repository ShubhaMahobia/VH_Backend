const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },

  day: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  meetingLink: {
    type: String,
    required: true,
  },
});

const appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = appointment;
