require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const jsonData = fs.readFileSync('flight_ticket_data.json');
const data = JSON.parse(jsonData);

const uri = process.env.DB_URI
mongoose.connect(uri);

const flightSchema = new mongoose.Schema({
  departureCity: String,
  arrivalCity: String,
  journeyDate: String,
  price: Number,
  flightName: String
});

const Flight = mongoose.model('flight', flightSchema);

const documents = Object.values(data);

Flight.insertMany(documents)
  .then(() => {
    console.log('All flight documents inserted');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error(error);
    mongoose.connection.close();
  });


  module.exports = {Flight}