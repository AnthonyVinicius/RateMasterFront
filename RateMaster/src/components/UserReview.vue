<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  comment: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="container-fluid d-flex flex-column align-items-center box rounded-4 mb-5 shadow-lg">
    <p class="lead text-white pt-4 text-resize">{{ props.comment }}</p>
    <img :src="props.src" alt="Profile Icon" class="img-profile" />
    <p class="lead text-white">{{props.user}}</p>
  </div>
</template>

<style scoped>
.box {
  background-color: #2C3E50;
  min-height: 350px; 
  overflow: hidden;
  text-align: center;
  }
  img{
    width: 100px;
    border-radius: 70px;
  }
</style>
