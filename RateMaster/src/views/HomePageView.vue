<script setup>

import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

</script>



<template>
    
    <TheNavbar />
    <div class="container-fluid p-0">
        <img src="../assets/Home.png" alt="Picture">
    </div>

    <div class="container-fluid  p-5">
        <section class="text-box text-center">
            <h1 class="display-4 text-color">Welcome to RateMaster</h1>
            <p class="lead text-color">Discover the best products and share your reviews.</p>
        </section>

        <section>
            <div class="container text-center p-3">
                <div class="row g-4">
                    <div class="col-3 ">
                        <div class="container bg-box rounded-4">
                            <i class="bi bi-box icon-box"></i>
                            <h5 class="text-white pt-4">Custom solutions tailored to your specific needs.</h5>
                            <p class="lead text-white pt-4 pb-5">We offer a range of products that simplify performance evaluation.</p>                           
                        </div>
                    </div>
                    <div class="col-3 ">
                        <div class="container bg-box rounded-4">
                            <i class="bi bi-box icon-box"></i>
                            <h5 class="text-white pt-4">Custom solutions tailored to your specific needs.</h5>
                            <p class="lead text-white pt-4 pb-5">We offer a range of products that simplify performance evaluation.</p>                           
                        </div>
                    </div>
                    <div class="col-3 ">
                        <div class="container bg-box rounded-4">
                            <i class="bi bi-box icon-box"></i>
                            <h5 class="text-white pt-4">Custom solutions tailored to your specific needs.</h5>
                            <p class="lead text-white pt-4 pb-5">We offer a range of products that simplify performance evaluation.</p>                           
                        </div>
                    </div>
                    <div class="col-3 ">
                        <div class="container bg-box rounded-4">
                            <i class="bi bi-box icon-box"></i>
                            <h5 class="text-white pt-4">Custom solutions tailored to your specific needs.</h5>
                            <p class="lead text-white pt-4 pb-5">We offer a range of products that simplify performance evaluation.</p>                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div class="container-fluid p-5 bg-box">
        <section class="text-box text-center">
            <h1 class="display-4 text-white">Evaluate with confidence.</h1>
            <p class="lead text-white">Discover detailed and unbiased reviews to help you make informed purchasing
                decisions.</p>
        </section>
    </div>

    <div class="container-fluid p-5 bg-box">
        <section class="text-box">
            <h1 class="display-4 text-white">Contact Us.</h1>
            <p class="lead text-white">Discover how our platform can help you.</p>
        </section>
    </div>

    <TheFooter />

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

.text-color {
    color: #2C3E50;
}
img{
    width: 100%;
}
</style>
