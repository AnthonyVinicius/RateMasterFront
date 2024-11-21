<script setup>

import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import ReviewHomePage from '@/components/ReviewHomePage.vue';

</script>



<template>

    <TheNavbar />
    <div class="container-fluid p-0">
        <img src="../assets/Home.png" alt="Picture">
    </div>

    <div class="container-fluid  p-5">
        <div class="text-box text-center">
            <h1 class="display-4 text-color">Welcome to RateMaster</h1>
            <p class="lead text-color">Discover the best products and share your reviews.</p>
        </div>


        <div class="container text-center p-3">
            <div class="row g-4">
                <div class="col">
                    <ReviewHomePage text="Custom solutions designed to meet your specific needs."
                        comment="We offer a range of products that simplify performance evaluation." />
                </div>
                <div class="col">
                    <ReviewHomePage text="Our services ensure quality and efficiency in every project."
                        comment="We are committed to delivering results that exceed your expectations." />
                </div>
                <div class="col">
                    <ReviewHomePage text="The technology that transforms the way you evaluate products."
                        comment="Innovation and convenience are the pillars of our solutions." />
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid p-5 bg-box">
        <div class="text-box text-center">
            <h1 class="display-4 text-white">Evaluate with confidence.</h1>
            <p class="lead text-white">Discover detailed and unbiased reviews to help you make informed purchasing
                decisions.</p>
        </div>
    </div>



    <div class="container text-center p-3">
        <div class="row g-4">
            <div class="col">
                <ReviewHomePage text="Custom solutions designed to meet your specific needs."
                    comment="We offer a range of products that simplify performance evaluation." />
            </div>
            <div class="col">
                <ReviewHomePage text="Our services ensure quality and efficiency in every project."
                    comment="We are committed to delivering results that exceed your expectations." />
            </div>
            <div class="col">
                <ReviewHomePage text="The technology that transforms the way you evaluate products."
                    comment="Innovation and convenience are the pillars of our solutions." />
            </div>
        </div>
    </div>



    <div class="container-fluid p-5 bg-box">
        <div class="text-box">
            <h1 class="display-4 text-white">Contact Us.</h1>
            <p class="lead text-white">Discover how our platform can help you.</p>
        </div>
    </div>


    <TheFooter />

</template>

<style scoped>
.bg-box {
    background-color: #2C3E50;
}

.icon-box {
    display: inline-block;
    color: #E74C3C;
    padding-top: 20px;
    font-size: 50px;
}

.text-color {
    color: #2C3E50;
}

img {
    width: 100%;
}
</style>
