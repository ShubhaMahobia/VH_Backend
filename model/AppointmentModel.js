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
  date: {
    type: String,
    required: true,
  },

  meetingHour: {
    type: String,
    required: true,
  },
  
  startTimeMin: {
    type: String,
    required: true,
  },

  endTimeMin: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  meetingId: {
    type: String,
    required: true,
  },
});

const appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = appointment;
