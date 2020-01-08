const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//routes
const memberRoutes = require("./api/routes/members");
const userRoutes = require('./api/routes/user');
const groupRoutes = require('./api/routes/groups');
//database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:'+
                process.env.MONGO_PWD+
                '@cluster-svlcf-q6d8a.mongodb.net/test?retryWrites=true&w=majority');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests

app.use("/members", memberRoutes);
app.use("/user", userRoutes);
app.use("/groups",groupRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
