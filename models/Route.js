const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: [true, 'Route name is required'],
      trim: true,
    },
    direction: {
      type: String,
      enum: ['toUniversity', 'fromUniversity'],
      required: [true, 'Direction is required'],
    },
    stops: {
      type: [String],
      required: [true, 'Stops are required'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Route', routeSchema);