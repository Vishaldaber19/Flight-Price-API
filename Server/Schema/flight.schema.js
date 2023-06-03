const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  departureCity: {
    type: String,
    required: true
  },
  arrivalCity: {
    type: String,
    required: true
  },
  journeyDate: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  flightName: {
    type: String,
    required: true
  }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
