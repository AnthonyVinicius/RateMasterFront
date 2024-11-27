<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import ReviewHomePage from '@/components/ReviewHomePage.vue';
import UserReview from '@/components/UserReview.vue';
import NavButton from '@/components/NavButton.vue';
</script>

<template>
    <div class="page-container">

        <TheNavbar />

        <main class="content">
            <div class="container-fluid p-0">
                <img class="header-img" src="../assets/img/Home.png" alt="Picture">
            </div>

            <div class="container-fluid  white-comment-container">
                <div class="text-box text-center">
                    <h1 class="display-4 text-color">Welcome to RateMaster</h1>
                    <p class="lead text-color pb-3">Discover the best products and share your reviews.</p>
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


            <div class="container-fluid colored-comment-container">
                <div class="text-box text-center p-5">
                    <h1 class="display-4 text-white text-start pt-5">Evaluate with confidence.</h1>
                    <p class="lead text-white text-start pb-5">Discover detailed and unbiased reviews to help you make
                        informed purchasing
                        decisions.</p>
                </div>
            </div>


            <div class="container">
                <div class="container text-center white-comment-container">
                    <div class="row g-4 pt-5 ">
                        <div class="col">
                            <UserReview
                                comment="I absolutely loved this product! The quality is outstanding, and it exceeded my expectations. I will definitely recommend it to my friends and family." />
                        </div>
                        <div class="col">
                            <UserReview
                                comment="The product is decent for the price, but it didn’t quite meet my expectations. It works, but there’s room for improvement." />
                        </div>
                        <div class="col">
                            <UserReview
                                comment="The customer service was fantastic! They were quick to respond, friendly, and resolved my issue in no time. A+ experience!" />
                        </div>
                        <div class="container border border-4 mt-5 p-0 text-start rounded-3">
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-6 d-flex">
                                    <div class="card-body p-5 p-lg-5">
                                        <div>
                                            <div class="mb-2 pb-1">
                                                <h1 class="h1 fw-bold">Discover our amazing products.</h1>
                                            </div>
                                            <h5 class="fw-normal pb-3">Explore our range of productsand find the perfect
                                                solution for your needs.</h5>
                                            <NavButton text="Learn More" class="button" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 d-none d-md-block">
                                    <img src="../assets/img/placeholder.png" alt="product-image"
                                        class="img-fluid product-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid colored-comment-container">
                <div class="text-box text-center p-5">
                    <h1 class="display-4 text-white text-start ">Contact Us.</h1>
                    <p class="lead text-white text-start">Discover how our platform can help you.</p>
                </div>
            </div>
        </main>

        <TheFooter />

    </div>
</template>

<style scoped>
.colored-comment-container {
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: #2C3E50;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.white-comment-container {
    padding-top: 100px;
    padding-bottom: 100px;

}

.header-img {
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
