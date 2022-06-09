const Task = require("../models/task_model");

// To get list of Tasks
exports.getTasks = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Set up Task query
    const TaskQuery = Task.find();

    // Execute task query
    TaskQuery.then( tasks => {
        if (!tasks.length) {
            return res.render("index" , { tasks: tasks });
            return res.status(404).json({
                'status': 'Success',
                'message': 'No Tasks found!',
                'tasks': tasks,
                'taskCount': tasks.length
            })}
        // Sorting the Retrieved Data before Sending back to the Client.
        if (subjectSortToggle) return res.render("index" , { tasks: tasks.sort((a, b) => (a.subject > b.subject) ? 1:-1) });
        else if (dateSortToggle) return res.render("index" , { tasks: tasks.sort((a, b) => (a.targetDate > b.targetDate) ? 1:-1) });
        else if (timeSortToggle) return res.render("index" , { tasks: tasks.sort((a, b) => (a.targetTime > b.targetTime) ? 1:-1) });
        else if (tagSortToggle) return res.render("index" , { tasks: tasks.sort((a, b) => (a.tag > b.tag) ? 1:-1) });
        else return res.render("index" , { tasks: tasks });
        res.status(200).json({
            'status': 'Success',
            'message': 'Tasks Fetched Successfully!',
            'tasks': tasks,
            'taskCount': tasks.length
        })})
        .catch( error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in Database Operation!',
                    'error': error
                })});
}

// To Create a Task
exports.createTask = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );
    // Create a new task object
    // req.body should strictly follow Task Model
    const task = new Task(req.body);

    // Save the object as document in MongoDb
    task.save()
        .then( createdTask => {
            return res.redirect("/tasks/");
            res.status(201).json({
                'status': 'Success',
                'message': 'Task Created SuccessFully!',
                'task': {
                    ...createdTask._doc,
                    taskId: createdTask._id
                }})})
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })});
}

// To get a specific Task
exports.getTask = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    const TaskQuery = Task.find();

    // Execute task query
    TaskQuery.then( tasks => {
        if (!tasks.length) {
            return res.render("index" , { tasks: tasks });
            return res.status(404).json({
                'status': 'Success',
                'message': 'No Tasks found!',
                'tasks': tasks,
                'taskCount': tasks.length
            })}
        // Get Task Id to modify
        const taskId = req.params.taskId;

        // Execute task query
        Task.findOne({ _id: taskId })
            .then( task => {
                if (!task) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No Task found with that Id!',
                        'task': task
                    })}
                // Sorting the Retrieved Data before Sending back to the Client
                if (subjectSortToggle) return res.render("update" , { task: task, tasks: tasks.sort((a, b) => (a.subject > b.subject) ? 1:-1) });
                else if (dateSortToggle) return res.render("update" , { task: task, tasks: tasks.sort((a, b) => (a.targetDate > b.targetDate) ? 1:-1) });
                else if (timeSortToggle) return res.render("update" , { task: task, tasks: tasks.sort((a, b) => (a.targetTime > b.targetTime) ? 1:-1) });
                else if (tagSortToggle) return res.render("update" , { task: task, tasks: tasks.sort((a, b) => (a.tag > b.tag) ? 1:-1) });
                else return res.render("update" , { task: task, tasks: tasks });
                res.status(200).json({
                    'status': 'Success',
                    'message': 'Task Fetched Successfully!',
                    'task': task
                })})
                .catch( error => {
                    res.status(500).json({
                        'status': 'Error',
                        'message': 'Error in Database Operation!',
                        'error': error
                    })});
        // res.status(200).json({
        //     'status': 'Success',
        //     'message': 'Tasks Fetched Successfully!',
        //     'tasks': tasks,
        //     'taskCount': tasks.length
        // })
        })
        .catch( error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in Database Operation!',
                    'error': error
                })});
}

// To Update a Task
exports.updateTask = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Get Task Id to modify
    const taskId = req.params.taskId;

    // Get Data to be modified
    const data = req.body;

    // Execute Update
    Task.findOneAndUpdate({ _id: taskId }, {
            ...data,
            'timestamps.modifiedOn': Date.now()
        }, { new: true })
        .then( updatedTask => {
            return res.redirect("/tasks/");
            res.status(201).json({
                'status': 'Success',
                'message': 'Task Updated Successfully!',
                'task': updatedTask
            })})
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })});
}

// To Mark task Complete
exports.completeTask = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Get Task Id to modify
    const taskId = req.params.taskId;

    // Execute Update
    Task.findOneAndUpdate({ _id: taskId }, {
            'isCompleted': true,
            'tag': "Completed",
            'timestamps.modifiedOn': Date.now(),
            'timestamps.completedOn': Date.now()
        }, { new: true })
        .then( updatedTask => {
            return res.redirect("/tasks/");
            res.status(201).json({
                'status': 'Success',
                'message': 'Task Marked as Completed!',
                'task': updatedTask
            })})
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })});
}

exports.uncompleteTask = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Get Task Id to modify
    const taskId = req.params.taskId;

    // Execute Update
    Task.findOneAndUpdate({ _id: taskId }, {
            'isCompleted': false,
            'tag': "Not Started",
            'timestamps.modifiedOn': Date.now(),
            'timestamps.completedOn': null
        }, { new: true })
        .then( updatedTask => {
            return res.redirect("/tasks/");
            res.status(201).json({
                'status': 'Success',
                'message': 'Task Marked as Completed!',
                'task': updatedTask
            })})
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })});
}

// To Delete a Task
exports.deleteTask = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Get Task Id to delete
    const taskId = req.params.taskId;

    // Execute Update
    Task.findOneAndDelete({ _id: taskId })
        .then( deletedTask => {
            return res.redirect("/tasks/");
            res.status(201).json({
                'status': 'Success',
                'message': 'Task Deleted Successfully!',
                'task': deletedTask
            })})
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })});
}

exports.sortSubject = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Toggling All Booleans to Sort Only for Subjects
    subjectSortToggle = !subjectSortToggle;
    dateSortToggle = false;
    timeSortToggle = false;
    tagSortToggle = false;

    return res.redirect("/tasks/");
}

exports.sortDate = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Toggling All Booleans to Sort Only for Dates
    subjectSortToggle = false;
    dateSortToggle = !dateSortToggle;
    timeSortToggle = false;
    tagSortToggle = false;

    return res.redirect("/tasks/");
}

exports.sortTime = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Toggling All Booleans to Sort Only for Times
    subjectSortToggle = false;
    dateSortToggle = false;
    timeSortToggle = !timeSortToggle;
    tagSortToggle = false;

    return res.redirect("/tasks/");
}

exports.sortTag = (req, res, next) => {
    // Log This Request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Toggling All Booleans to Sort Only for Tags
    subjectSortToggle = false;
    dateSortToggle = false;
    timeSortToggle = false;
    tagSortToggle = !tagSortToggle;

    return res.redirect("/tasks/");
}