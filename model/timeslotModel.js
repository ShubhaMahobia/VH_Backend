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
  daysAvailable: {
    type: {
      Monday: Boolean,
      Tuesday: Boolean,
      Wednesday: Boolean,
      Thursday: Boolean,
      Friday: Boolean,
      Saturday: Boolean,
    },
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
