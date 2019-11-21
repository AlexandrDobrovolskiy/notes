import { read, write } from './asyncStorage';

class SxsStore {
    constructor({ read, write }) {
        this.storage = { read, write };
    }

    key = 'sxsStore'

    async addTask(task) {
        let tasks = await this.storage.read(this.key);

        if (!tasks) {
            tasks = [task];
        } else {
            tasks.push(task);
        }

        return await this.storage.write(this.key, tasks);
    }

    resetTasks(tasks) {
        this.storage.write(this.key, tasks);
    }

    getTasks() {
        return this.storage.read(this.key);
    }
}

export default new SxsStore({ read, write });
