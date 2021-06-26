// 10_POST_server.js | Backend | Add a new route for POST requests

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 5000;
const app = express();

// Set a Body Parsing Middleware

// Install body-parser via Terminal
// npm install body-parser

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000"
};

// Kintone API Setup
const subdomain = "xeonnux"; //Enter your Kintone Subdomain (ex: devevents)
const appID = "2"; //Enter your App's ID number (ex: 1)
const apiToken = "pxyNY2p2jkJlosq3gM9lAs8yFbudSXcoqHNRW3IR"; //Enter your App's API Token

// Append a Query Parameters to the Request Endpoint
const parameters = "query=order by recordID asc";

// const requestEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}&${parameters}`;

const multipleRecordsEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}&${parameters}`

const singleRecordEndpoint = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appID}&${parameters}`;


// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/getData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': apiToken
    }
  }
  // const response = await fetch(requestEndpoint, fetchOptions);
  const response = await fetch(multipleRecordsEndpoint, fetchOptions);

  const jsonResponse = await response.json();
  res.json(jsonResponse);
});

// Add a New Route for a POST request using singleRecordEndpoint
app.post('/postData', cors(corsOptions), async (req, res) => {
  const requestbody = {
    "app": appID,
    "record": {
      "title": {
        "value": req.body.title
      },
      "author": {
        "value": req.body.author
      }
    }
  };
  const options = {
    method: 'POST',
    headers: {
      'X-Cybozu-API-Token': apiToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestbody)
  }

  // Parameters needed for a POST request to Kintone
  const response = await fetch(singleRecordEndpoint, options);
  const jsonResponse = await response.json();
  res.json(jsonResponse);

});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

/*
backend - Express server side
Add a POST request rout to add data from user input via form
Expected Output at http://localhost:5000/getData
*/
