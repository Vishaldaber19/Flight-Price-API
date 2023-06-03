const Flight = require('../Schema/flight.schema'); 
const {http_formatter} = require('../util/formatter')

const flightInfo = (req, res) => { 
    const { from, to, date } = req.params;
    Flight
    .find({departureCity : from, arrivalCity: to,journeyDate: date})
    .select('flightName price')
    .then((result)=> {
        res.send(result)
       
    })
    .catch((err) => res.send(http_formatter("Error while finding flight data", err)));
   
}

module.exports = {flightInfo}
