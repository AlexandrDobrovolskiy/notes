class Task {
    constructor(name, projectID) {
        this.projectID = projectID;
        this.name = name;
        this.done = false;
        this. createdAt = new Date();
    }
}

export default Task;
