<script setup>
import ProductDetail from '@/components/ProductDetails.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <TheNavbar />
  <div class="reviews"> 
    <h1>Product Details</h1>
    <br>
      <ProductDetail />
    <TheFooter />
  </div>
</template>

<style>
h1{
  text-align: center;
}
</style>
