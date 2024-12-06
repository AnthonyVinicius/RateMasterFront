<script setup>
import { defineProps } from 'vue';

defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <button class="btn btn-outline" type="submit">
    <span v-html="text"></span>
  </button>
</template>

<style scoped>
button {
  background-color: #E74C3C;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  color: white;
  background-color: #393f81;
  transform: scale(1.1);
}
</style>
