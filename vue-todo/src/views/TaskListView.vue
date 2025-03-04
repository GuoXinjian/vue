<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import TaskItem from '@/components/TaskItem.vue';

// 创建响应式的筛选条件
const filter = ref('all'); // 'all', 'completed', 'active'

// 获取任务列表
const store = useTaskStore();

// 计算筛选后的任务列表
const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return store.tasks.filter(task => task.completed);
  } else if (filter.value === 'active') {
    return store.tasks.filter(task => !task.completed);
  }
  return store.tasks; // all
});
</script>

<template>
  <div>
    <h2>任务列表</h2>
    <input v-model="store.newTask" placeholder="添加任务..." @keyup.enter="store.addTask" />
    <button @click="store.addTask">添加</button>

    <!-- 筛选按钮 -->
    <div class="filters">
      <button @click="filter = 'all'">全部</button>
      <button @click="filter = 'active'">未完成</button>
      <button @click="filter = 'completed'">已完成</button>
    </div>

    <ul>
      <TaskItem 
        v-for="task in filteredTasks" 
        :key="task.id" 
        :task="task" 
        @toggle="store.toggleTask" 
        @remove="store.removeTask" 
        @edit="store.editTask" 
      />
    </ul>
  </div>
</template>

<style scoped>
.filters {
  margin-top: 10px;
  margin-bottom: 20px;
}

.filters button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.filters button:hover {
  background-color: #0056b3;
}
</style>
