<script setup>

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

</script>


<template>
    <Navbar />
    <div class="container-fluid m-0 p-0">
        <img src="../assets/Home.png" alt="Picture">
    </div>

    <div class="container-fluid m-0 p-5">
        <section class="text-box text-center">
            <h1 class="display-4 text-color">Welcome to RateMaster</h1>
            <p class="lead text-color">Discover the best products and share your reviews.</p>
        </section>
    </div>

    <div class="container-fluid m-0 p-5 bg-box">
        <section class="text-box text-center">
            <h1 class="display-4 text-white">Evaluate with confidence.</h1>
            <p class="lead text-white">Discover detailed and unbiased reviews to help you make informed purchasing
                decisions.</p>
        </section>
    </div>

    <div class="container-fluid m-0 p-5 bg-box">
        <section class="text-box">
            <h1 class="display-4 text-white">Contact Us.</h1>
            <p class="lead text-white">Discover how our platform can help you.</p>
        </section>
    </div>

    <Footer />

</template>

<style scoped>
.bg-box {
    background-color: #2C3E50;
}

.text-color {
    color: #2C3E50;
}
img{
    width: 100%;
}
</style>
