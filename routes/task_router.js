const TaskController = require('../controllers/task_functions');
const express = require("express");

const router = express.Router();

// Getting All Tasks
router.get('/', TaskController.getTasks);

// Creating and Adding a New Task
router.post('/add-task', TaskController.createTask);

// Getting a Particular Task
router.get('/get-task/:taskId', TaskController.getTask);

// Updating a Particular Task's Content
router.post('/upd-task/:taskId', TaskController.updateTask);

// Mark a Particular Task to be Completed
router.get('/patch-task/:taskId', TaskController.completeTask);

// Unmark a Particular Task from being Complete
router.get('/unpatch-task/:taskId', TaskController.uncompleteTask);

// Delete a Particular Task
router.get('/del-task/:taskId', TaskController.deleteTask);  

// Task Sorting Purposes
router.get('/sort-subject/', TaskController.sortSubject);
router.get('/sort-date/', TaskController.sortDate);
router.get('/sort-time/', TaskController.sortTime);
router.get('/sort-tag/', TaskController.sortTag);

module.exports = router;