class Task {
    constructor(status = false, id, subject, desc, date, time, tags) {
        this.status = status;
        this.id = id; // auto-increment base on tasks.length
        this.subject = subject;
        this.desciption = desc;
        this.date = date;
        this.time = time;
        this.tag = tag;
    }
    // getters and setters for each
}