<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits(['toggle', 'remove', 'edit']);

const isEditing = ref(false);
const editedText = ref(props.task.text);

// 切换任务状态
const toggleTask = () => {
  emit('toggle', props.task.id);
};

// 删除任务
const removeTask = () => {
  emit('remove', props.task.id);
};

// 开始编辑任务
const startEditing = () => {
  isEditing.value = true;
};

// 提交编辑后的任务
const submitEdit = () => {
  if (editedText.value.trim() !== '') {
    emit('edit', { id: props.task.id, text: editedText.value });
    isEditing.value = false;
  }
};

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false;
  editedText.value = props.task.text;
};
</script>

<template>
  <li :class="{ completed: task.completed }">
    <input type="checkbox" :checked="task.completed" @change="toggleTask" />
    
    <span v-if="!isEditing">{{ task.text }}</span>
    <input v-if="isEditing" v-model="editedText" />

    <button @click="startEditing" v-if="!isEditing">编辑</button>
    <button @click="submitEdit" v-if="isEditing">提交</button>
    <button @click="cancelEdit" v-if="isEditing">取消</button>
    <button @click="removeTask">删除</button>
  </li>
</template>

<style scoped>
.completed span {
  text-decoration: line-through;
  color: gray;
}
</style>
