<template>
  <div class="container box rounded-4">
    <i class="bi bi-box icon-box"></i>
    <h5 class="text-white pt-4">
      <slot name="title"></slot>
    </h5>
    <p class="lead text-white pt-4 pb-5">
      <slot name="comment"></slot>
    </p>
  </div>
</template>

<style scoped>
.box {
  background-color: #2C3E50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 350px;
}

.icon-box {
  display: inline-block;
  color: #E74C3C;
  padding-top: 20px;
  font-size: 50px;
}
</style>
