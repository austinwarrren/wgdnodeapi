// index.js -- provides API functionality

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var Charge = require('./Charge');

app.use(bodyParser.json({ strict: false }));

// Probably use this method to handle CORS in the future
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/contact', function(req,res){
  
})

app.post('/pay', function(req, res){
  // Grab token and amount from Checkout
  const token = req.body.stripeToken.id; //Add error-checking to determine if this exists
  const amt = req.body.paymentAmount * 100; //Add error-checking to determine if this exists
  // Create a charge using the token and amount
  var charge = new Charge(token, amt);
  charge.create();
})

module.exports.handler = serverless(app);