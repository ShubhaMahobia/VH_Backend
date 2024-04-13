const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBooked: { type: Boolean, required: true, default: false },
  // Add more fields to your schema here
});

const scheduleSchema = new mongoose.Schema({
  docId: {
    type: String,
    required: true,
    unique: true,
  },
  timeSlots: [timeSlotSchema],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
