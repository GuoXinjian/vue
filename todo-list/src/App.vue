<template>
  <div class="app">
    <h1>Todo List</h1>
    <div>
      <input v-model="newTodo" placeholder="Add a new task" @keyup.enter="addTodo" />
      <button @click="addTodo">Add</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 这里写逻辑
import { ref } from 'vue';
import { watch } from 'vue';

// const todos = res([
//   { id: 1, text: 'Learn Vue 3', completed: false },
//   { id: 2, text: 'Build a Todo List', completed: true },
  
// ]);

const todos = ref(JSON.parse(localStorage.getItem('todos')) || []);
const newTodo = ref('');

const addTodo = () => {
  if (newTodo.value.trim() === '') {
    return;
  }
  todos.value.push({
    id: todos.value.length + 1,
    text: newTodo.value,
    completed: false,
  });
  newTodo.value = '';
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};





watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
}

button {
  padding: 10px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor:pointer;
}

button:hover{
  background-color : #33a06f;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

li input {
  margin-right: 10px;
}

li button {
  margin-left: auto;
  background-color: #ff4444;
}

li button:hover{
  background-color : #cc0000;
}

</style>