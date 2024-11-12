<script setup>
import ProductReview from '@/components/ProductReview.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <div class="reviews"> 
    <TheNavbar />
    <h1>Product Reviews</h1>
    <br>
      <ProductReview></ProductReview>
    <TheFooter />
  </div>
</template>

<style>
h1{
  text-align: center;
}
</style>
