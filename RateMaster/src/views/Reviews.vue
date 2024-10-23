<script>

import ProductReview from '@/components/ProductReview.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default{
  name: 'Reviews',
  components:{
    Navbar,
    Footer,
    ProductReview
  }
}

</script>

<template>
  <div class="reviews"> 
    <Navbar />
    <h1>Product Reviews</h1>
    <br>
      <ProductReview></ProductReview>
    <Footer />
  </div>
</template>

<style>
h1{
  text-align: center;
}
</style>
