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
                    <h1 class="display-4 text-color">Bem Vindo à RateMaster</h1>
                    <p class="lead text-color pb-3">Descubra os melhores produtos e compartilhe suas opniões.</p>
                </div>

                <div class="container text-center p-3">
                    <div class="row g-4">
                        <div class="col">
                            <ReviewHomePage
                                text="Soluções personalizadas desenvolvidas para atender às suas necessidades específicas."
                                comment="Oferecemos uma gama de produtos que simplificam a avaliação de desempenho." />
                        </div>
                        <div class="col">
                            <ReviewHomePage text="Nossos serviços garantem qualidade e eficiência em cada projeto."
                                comment="Estamos comprometidos em entregar resultados que superem suas expectativas." />
                        </div>
                        <div class="col">
                            <ReviewHomePage text="A tecnologia que transforma a maneira como você avalia produtos."
                                comment="Inovação e conveniência são os pilares das nossas soluções." />
                        </div>
                    </div>
                </div>
            </div>


            <div class="container-fluid colored-comment-container">
                <div class="text-box text-center p-5">
                    <h1 class="display-4 text-white text-start pt-5">Avalie com confiança.</h1>
                    <p class="lead text-white text-start pb-5">Descubra avaliações detalhadas e imparciais para ajudá-lo
                        a tomar decisões de compra informadas.</p>
                </div>
            </div>


            <div class="container">
                <div class="container text-center white-comment-container">
                    <div class="row g-4 pt-5 ">
                        <div class="col">
                            <UserReview
                                comment="Eu simplesmente amei este produto! Qualidade é excepcional e superou minhas expectativas. Vou recomendá-lo aos meus amigos e familiares."
                                src="/user1.jpeg"
                                user="Carol" />
                        </div>
                        <div class="col">
                            <UserReview
                                comment="O produto é razoável pelo preço, mas não atendeu totalmente às minhas expectativas. Funciona, mas há espaço para melhorias."
                                src="/user2.jpeg"
                                user="Maria" />
                        </div>
                        <div class="col">
                            <UserReview
                                comment="O atendimento ao cliente foi fantástico! Foram rápidos em responder, amigáveis e resolveram meu problema em pouco tempo. Experiência A+!"
                                src="/user3.jpeg" 
                                user="Carlos" />
                        </div>
                        <div class="container border border-4 mt-5 p-0 text-start rounded-3">
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-6 d-flex">
                                    <div class="card-body p-5 p-lg-5">
                                        <div>
                                            <div class="mb-2 pb-1">
                                                <h1 class="h1 fw-bold">Descubra nossos produtos incríveis.</h1>
                                            </div>
                                            <h5 class="fw-normal pb-3">Explore nossa gama de produtos e encontre a
                                                solução perfeita para suas necessidades.</h5>
                                            <NavButton text="Saiba Mais" class="button" />
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
                    <h1 class="display-4 text-white text-start ">Entre em contato conosco.</h1>
                    <p class="lead text-white text-start">Descubra como nossa plataforma pode ajudá-lo.</p>
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
