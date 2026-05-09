const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: [true, 'Bus name is required'],
      trim: true,
    },
    origin: {
      type: String,
      required: [true, 'Origin is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['government', 'private'],
      required: [true, 'Bus type is required'],
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      required: [true, 'Route reference is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bus', busSchema);