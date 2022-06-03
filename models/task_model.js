const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    status: {
        type: Boolean,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {type: String},
    date: {type: String},
    time: {type: String},
    tag: {type: String}
});

const Task = mongoose.model('task', taskSchema);
module.exports = Task;