const flights = require("../flights.json");


exports.example = (req, res) => {
    console.log("example")
    res.send({flights})
}