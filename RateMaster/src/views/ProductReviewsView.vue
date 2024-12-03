<script setup>
import ProductReview from '@/components/ProductReview.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <div class="page-container">

  <TheNavbar />

  <main class="content">
    <h1 class="text-center">Avaliações de Produtos</h1>
    <br>
    <ProductReview />
  </main>

  <TheFooter />
</div>

</template>
