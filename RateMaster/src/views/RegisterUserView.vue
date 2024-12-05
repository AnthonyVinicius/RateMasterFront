<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import NavButton from '@/components/NavButton.vue';
</script>

<template>
    <div class="page-container">

        <TheNavbar />

        <main class="content" v-if="true">
            <div class="container">
                <div class="card register-card">
                    <div class="row g-0">

                        <div class="col-md-6 col-lg-6 d-flex">
                            <div class="card-body p-4 p-lg-5">

                                <form>
                                    
                                    <div class="mb-2 pb-1">
                                        <h1 class="h1 fw-bold register-title">RateMaster</h1>
                                    </div>

                                    
                                    <h5 class="fw-normal pb-3 register-header">Criar uma nova conta</h5>

                                    <div>

                                        <div class="form-outline mb-1">
                                            <input type="lead text" id="username" class="form-control form-control-lg"
                                                placeholder="Digite seu nome" required />
                                        </div>

                                        <div class="form-outline mb-1">
                                            <input type="email" id="email" class="form-control form-control-lg"
                                                placeholder="Enter your email" required />
                                        </div>

                                        <div class="form-outline mb-1">
                                            <input type="password" id="password" class="form-control form-control-lg"
                                                placeholder="Digite sua senha" required />
                                        </div>

                                        <div class="form-outline mb-1">
                                            <input type="password" id="confirm-password" class="form-control form-control-lg"
                                                placeholder="Confirme sua senha" required />
                                        </div>

                                        <div class="d-flex justify-content-between m-3">

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value=""
                                                    id="termsCheck" required>
                                                <label class="form-check-label" for="termsCheck">Eu concordo com o
                                                    <RouterLink to="/terms">Termos de uso</RouterLink> e
                                                    <RouterLink to="/privacy">Política de privacidade.</RouterLink></label>
                                            </div>

                                        </div>
                                    </div>

                                    <NavButton text="Cadastrar-se" class="button" />

                                    <p class="mb-3 mt-3 pb-lg-2 has-account"> Já possui uma conta? <RouterLink
                                            to="/login">
                                            Entrar</RouterLink>
                                    </p>

                                </form>

                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 d-none d-md-block">
                            <img src="../assets/img/evaluation-feedback-customer-smiley-response.jpg" alt="register form"
                                class="img-fluid register-image rounded-end" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <TheFooter />

    </div>
</template>

<style scoped>
.container {
    padding: 100px;
}

.register-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.register-header {
    letter-spacing: 1px;
    color: #333;
}

a {
    color: #E74C3C;
    text-decoration: none;
}

a:hover {
    color: #1e90ff;
    text-decoration: underline;
}

.button {
    width: 100%;
}

button:hover {
    transform: scale(1.01);
}

.has-account {
    font-size: 14px;
    text-align: center;
}
</style>
