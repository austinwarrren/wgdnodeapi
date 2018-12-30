// index.js -- provides API functionality

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var Charge = require('./Charge');
var Mailer = require('./Mailer');

app.use(bodyParser.json({ strict: false }));

// Probably use this method to handle CORS in the future
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/contact', function(req,res){
  // Get necessary information from JSON response
  const name = req.body.Name;
  const email = req.body.Email;
  const message = req.body.Message;
  if(name == null || name === ""){
    res.status(400).json({ error: 'Field \'name\' cannot be null or empty.'});
  }
  else if(email == null || email === ""){
    res.status(400).json({ error: 'Field \'email\' cannot be null or empty.'});
  }
  else if(message == null || message === ""){
    res.status(400).json({ error: 'Field \'message\' cannot be null or empty.'});
  }
  else{
    const mailer = new Mailer(name, email, message);
    mailer.send();
    res.status(200).json({ success: 'Message sent successfully.'});
  }
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