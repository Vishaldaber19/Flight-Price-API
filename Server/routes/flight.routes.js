const express = require('express');
const flightRouter = express.Router();
const {flightInfo} = require('../controllers/flight.controller');

flightRouter.get('/:from/:to/:date',flightInfo);

module.exports = flightRouter


