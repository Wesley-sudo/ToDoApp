const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const dbcreds = require("./credentials");

// Global Toggle Variables for Sorting
global.subjectSortToggle = false;
global.dateSortToggle = false;
global.timeSortToggle = false;
global.tagSortToggle = false;

// Imports for Routes
const taskRoutes = require("./routes/task_router");

// Create an Express App
const app = express();

// Handle MongoDB Connection
const dbURI = `mongodb+srv://${dbcreds.databaseName}:${dbcreds.databasePassword}@cluster0.psmwl.mongodb.net/${dbcreds.databaseName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("Connected to database!"); })
  .catch(() => { console.log("Connection failed!"); });

// Use body-parser to parse incoming reuests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use ejs as view engine
app.set("view engine", "ejs");
app.use(express.static("./public"));

// Use Cors to avoid annoying CORS Errors
app.use(cors());

// Handle Authentication If Any

// Send basic info about the API
app.use("/api/info", (req, res, next) => {
  res.status(200).json({
    name: "TODO Api",
    version: "1.0",
    description: "RESTful API Designed in Node.js for TODO application.",
    methodsAllowed: "GET, POST, PUT, PATCH, DELETE",
    authType: "None",
    rootEndPoint: req.protocol + '://' + req.get('host') + '/tasks',
    documentation: "https://github.com/toslimarif/todo-api"
  });
});

// Set up API Routes
app.use("/tasks", taskRoutes);

module.exports = app;