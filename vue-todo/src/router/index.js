import { createRouter, createWebHistory } from 'vue-router';
import TaskListView from '@/views/TaskListView.vue';

const routes = [
  { path: '/', component: TaskListView },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;