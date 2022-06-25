const express = require("express");
// const { json } = require("express");
const flightcontrols = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const flights = require("./flights.json");
const fs = require("fs");
const { request } = require("http");


const app = express();

// enable us to send json data to the API.
app.use(express.json());

app.use("/", routes);

 // get all flights in a json object format.
app.get('/flights', (req, res) => {
  return res.json( { flights })
})

// add to flights list
app.post('/flights', (req, res) =>{
  // create a new flight from the server, by adding a new object to the existing array and save.
  flights.push(req.body.newflight);
  
  let stringedData = JSON.stringify(flight, null, 2);
  fs.writeFile('flights.json', stringedData, function(err) {
    if (err) {
      return res.status(500).json({message: err})
    }
  })
  return res.status(200).json({ message: "new flight created"})
})

// delete a flight
app.delete('/flights/:id', (req, res) =>{
  flight.pop(req.body.newflight);

  let stringedData = JSON.stringify(flight, null, 2);
  fs.writeFile('flight.json', stringedData, function(err) {
    if (err) {
      return res.status(500).json({message: err})
    }
  })
})

// Edit a flight
app.put('/flights/:id', (req, res) =>{
  flights.pop(req.body.newflight);

  let stringedData = JSON.stringify(flight, null, 2);
  fs.writeFile('flight.json', stringedData, function(err) {
    if (err) {
      return res.status(500).json({message: err})
    }
  })
})

// fecth single flight by id
app.get('flights/:id', (req, res) => {
  // console.log(req.params.id)
  // fetch req with id
  let id = req.params.id;
  // find flight with id
  let foundflight = flights.find(flight => {
    return String(flight.id) === id
  })
  if (foundflight) {
    return res.status(200).json({flight: foundflight})
  } else {
    return res.status(404).json({message: "flight not found"})
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


