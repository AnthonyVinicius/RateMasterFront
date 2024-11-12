<script>
export default {
  name: 'NavButton',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}

</script>
<template>

    <button class="btn btn-outline" type="submit">{{text}}</button>

</template>

<style scoped>
button {
  background-color: #E74C3C;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  color: white;
  background-color: #E74C3C;
  transform: scale(1.1);
}
</style>