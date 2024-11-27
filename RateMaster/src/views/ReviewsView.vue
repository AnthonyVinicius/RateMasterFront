<script setup>
import ProductReview from '@/components/ProductReview.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <TheNavbar />
  <div class="product-detail">
  <h1>Product Reviews</h1>
  <br>
  <ProductReview />
</div>
  <TheFooter />

</template>

<style scoped>
.product-detail{
background-color: #f5f5f5;
}
h1 {
  text-align: center;
}
</style>
