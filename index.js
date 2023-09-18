const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Create express app.
const app = express();

// Use body parser which we will use to parse request body that sending from client.
app.use(bodyParser.json());

// Enable CORS for all routes.
app.use(cors());

// We will store our client files in ./client directory.
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey =
  "BNfXgd4VxsMomT1Qv6V5VdgiQ7IztHVlFFLjXJ-M9F09cvVvA7nn_SW3S3AzuShmiQA-jYMRicXxKfBFq4SVAuM";

const privateVapidKey = "rtMav_DSoLrJb_-MUBmPtRqzrjWnpOC0PWwDmB9SnW4";

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails(
  "mailto:nayeemxtreme@live.com",
  publicVapidKey,
  privateVapidKey
);

// Create route for allow client to subscribe to push notification.
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Hello World",
    body: "This is your first push notification"
  });

  webpush.sendNotification(subscription, payload).catch(console.log);
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
