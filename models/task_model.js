const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: 'N/A'
    },
    // onDate: {
    //     type: Date,
    //     required: true,
    //     default: Date.now
    // },
    targetDate: {
        type: Date,
        required: true,
        default: null
    },
    targetTime: {
        type: String,
        required: true,
        default: null
    },
    // cardColor: {
    //     type: String,
    //     required: true,
    //     default: '#cddc39'
    // },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    tag: {
        type: String,
        required: true,
        default: "Not Started"
    },
    timestamps: {
        createdOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        modifiedOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        completedOn: {
            type: Date,
            default: null
        }
    }
});

const Task = mongoose.model('task', taskSchema);
module.exports = Task;