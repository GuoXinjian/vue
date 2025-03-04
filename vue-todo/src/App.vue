<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="container">
    <h1>待办事项</h1>
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
}
</style>
