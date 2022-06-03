const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task_model");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// Connection to the mongodb
const dbURI = 'mongodb+srv://hextechdb:sia4oqri@cluster0.psmwl.mongodb.net/hextechdb?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Getting the data from the database.
app.get('/', (req, res) => {
    Task.find()
        .then((result) => {
            let tasks = result;
            res.render("index" , { tasks: tasks }) })
        .catch((err) => { console.log(err) });
});

// For sending data into the database
app.get('/add-task', (req, res) => {
    const task = new Task({
        status: false,
        subject: req.query.subject,
        description: req.query.description,
        date: req.query.date,
        time: req.query.time,
        tag: req.query.tag,
    });

    // After saving the new data, update the page.
    task.save()
        .then((result) => { res.redirect('/'); })
        .catch((err) => { res.send(err); });
});

// Update data to the database.
app.get('/upd-task/(:id)', (req, res) => {
    Task.findById(req.params.id)
        .then((result) => { 
            let task = result;
            Task.findByIdAndDelete(req.params.id, (err, doc) => {
                if(!err) {
                    Task.find()
                        .then((result) => {
                            let tasks = result;
                            res.render("update" , { tasks: tasks, task: task}) })
                        .catch((err) => { console.log(err) });
                }
                else console.log("Failed to Delete Task: " + err);
            });
        })
        .catch((err) => console.log(err));
});

// Deleting data from the database.
app.get('/del-task/(:id)', (req, res) => {
    Task.findByIdAndDelete(req.params.id, (err, doc) => {
        if(!err) res.redirect('/'); 
        else console.log("Failed to Delete Task: " + err);
    });
});