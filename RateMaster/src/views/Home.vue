<script setup>

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>

    <Navbar />
    <img src="../assets/Home.png" alt="Picture">

    <section class="text-box">
        <h1>Welcome to RateMaster</h1>
        <p>Discover the best products and share your reviews.</p>
    </section>



    <Footer />

</template>

<style scoped>

    img{
        width: 100%;
    }

    .text-box{
        margin: 100px;
        text-align: center;
    }


</style>
