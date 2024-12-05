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
                                src="/user1.jpeg" user="Carol" />
                        </div>
                        <div class="col">
                            <UserReview
                                comment="O produto é razoável pelo preço, mas não atendeu totalmente às minhas expectativas. Funciona, mas há espaço para melhorias."
                                src="/user2.jpeg" user="Maria" />
                        </div>
                        <div class="col">
                            <UserReview
                                comment="O atendimento ao cliente foi fantástico! Foram rápidos em responder, amigáveis e resolveram meu problema em pouco tempo. Experiência A+!"
                                src="/user3.jpeg" user="Carlos" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid colored-comment-container">
    <div class="row">
        <div class="col p-5 d-flex justify-content-between align-items-center">
            <div>
                <h1 class="display-4 text-white text-start">Entre em contato conosco.</h1>
                <p class="lead text-white text-start">Descubra como nossa plataforma pode ajudá-lo.</p>
            </div>

            <div class="row justify-content-center w-100">
                <div class="col-12 col-md-6">
                    <form>
                        <div class="mb-3">
                            <label for="nome" class="form-label text-white">Nome</label>
                            <input type="text" class="form-control" placeholder="Seu nome">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label text-white">Email</label>
                            <input type="email" class="form-control" placeholder="Seu email">
                        </div>
                        <div class="mb-3">
                            <label for="mensagem" class="form-label text-white">Mensagem</label>
                            <input type="mens" class="form-control" placeholder="Escreva sua mensagem">
                        </div>
                        <NavButton text="Enviar" class="button mt-2" />
                    </form>
                </div>
            </div>
        </div>
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

.button {
  width: 100%;
}

button:hover {
  transform: scale(1.01);
}

.header-img {
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
