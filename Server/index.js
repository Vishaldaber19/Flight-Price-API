require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const flightRouter = require('./routes/flight.routes')
const app = express();

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.send({
      message:"Working!!"
  })
})


app.use('/flights', flightRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("DB connected successfully.")
}).catch(err => {
    console.error("DB connection failed.")
    console.error(err)
    process.exit(1) // kill the server
});