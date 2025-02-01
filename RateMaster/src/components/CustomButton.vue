<template>
  <button class="btn btn-outline" type="submit">
    <slot></slot>
  </button>
</template>

<style scoped>

button {
  background-color: #1ABC9C;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  color: white;
  background-color: #16A085;
  transform: scale(1.1);
}
</style>
