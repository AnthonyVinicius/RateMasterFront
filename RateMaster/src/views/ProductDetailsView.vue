<script setup>
import ProductDetail from '@/components/ProductDetails.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <div class="page-container">
    <TheNavbar />

    <main class="content">
      <h1 class="text-center">Product Details</h1>
      <br>
      <ProductDetail />
    </main>

    <TheFooter />
  </div>

</template>

