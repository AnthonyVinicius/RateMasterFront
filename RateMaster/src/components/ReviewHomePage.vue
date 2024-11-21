<script>
export default {
  name: 'ReviewHomePage',
  props: {
    text: {
      type: String,
      required: true
    },
    comment:{
    type: String,
      required: true
    }
  }
}
</script>

<template>
    <div class="container bg-box rounded-4">
        <i class="bi bi-box icon-box"></i>
        <h5 class="text-white pt-4">{{text}}</h5>
        <p class="lead text-white pt-4 pb-5">{{comment}}</p>
    </div>
</template>

<style scoped>
.bg-box {
    background-color: #2C3E50;
}

.icon-box{
    display: inline-block;
    color: #E74C3C;
    padding-top: 20px;
    font-size: 50px;
}
</style>