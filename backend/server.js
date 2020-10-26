"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stock , customers} = require ("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
.post("/order", (req, res) => {
  
  const {order, size, givenName, surname, email, address, city, province, postcode, country} = req.body ;
  console.log(req.body);
  const newCust = req.body ;
  const stockData= stock;
  let errorID;

const customerInDB = customers.forEach(customer => { if
  (customer.givenName.toLowerCase() === givenName.toLowerCase() &&
  customer.surname.toLowerCase() === surname.toLowerCase() || 
  customer.address.toLowerCase() === address.toLowerCase() ||
  customer.email.toLowerCase() === email.toLowerCase()) { return true } })
  
if (country.toLowerCase() != "canada") {
    errorID = "undeliverable"
} else if (!email.toLowerCase().includes("@")) {
    errorID = "missing data"
  } else if (customerInDB == true) {
    errorID = "repeat-customer"
  } else if(order === "tshirt" && stockData.tshirt[size] == 0) {
    errorID = "unavailable" 
  } else { res.status(200).json({
    status: "success",
    data: newCust
  })}

  res.status(400).json({status:"error", error: errorID })
// }
 
})

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
