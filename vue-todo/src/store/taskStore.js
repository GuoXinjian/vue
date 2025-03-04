import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    newTask: ''
  }),
  actions: {
    addTask() {
      if (this.newTask.trim()) {
        const newTask = {
          id: Date.now(),
          text: this.newTask,
          completed: false
        };
        this.tasks.push(newTask);
        this.newTask = '';
        this.saveTasks();
      }
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) task.completed = !task.completed;
      this.saveTasks();
    },
    editTask({ id, text }) {
      const task = this.tasks.find(t => t.id === id);
      if (task) task.text = text;
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
});
