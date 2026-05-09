const mongoose = require('mongoose');

const stopTimeSchema = new mongoose.Schema({
  stop: { type: String, required: true },
  time: { type: String, required: true },
});

const scheduleSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: [true, 'Bus reference is required'],
    },
    departureTime: {
      type: String,
      required: [true, 'Departure time is required'],
      trim: true,
    },
    stopTimes: {
      type: [stopTimeSchema],
      required: [true, 'Stop times are required'],
    },
    daysOperating: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: [true, 'Days operating is required'],
    },
    status: {
      type: String,
      enum: ['on-time', 'delayed', 'cancelled'],
      default: 'on-time',
    },
    remarks: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Schedule', scheduleSchema);