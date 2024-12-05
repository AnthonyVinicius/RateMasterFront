<template>
    <footer class="container-fluid p-4 bg-color text-center">
        <!-- Logo da Empresa -->
        <div class="mb-3">
            <img class="logo" src="/src/assets/img/Icon.png" alt="Logo da Empresa">
            <h1 class="fw-bold text-white">RateMaster</h1>
        </div>

        <!-- Ícones de Redes Sociais -->
        <div class="mb-3">
            <a href="https://facebook.com" target="_blank" class="text-white me-3">
                <i class="fab fa-facebook fa-1x"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="text-white me-3">
                <i class="fab fa-twitter fa-1x"></i>
            </a>
            <a href="https://instagram.com" target="_blank" class="text-white">
                <i class="fab fa-instagram fa-1x"></i>
            </a>
        </div>

        <!-- Texto de Direitos Reservados -->
        <div class="text-white">
            <p>©{{ new Date().getFullYear() }} Ratemaster. Todos os direitos reservados.</p>
        </div>
    </footer>
</template>

<style scoped>
.bg-color {
    background-color: #2C3E50;
}

footer a {
    text-decoration: none;
    transition: color 0.3s ease;
}

footer a:hover {
    color: #1ABC9C;
}

.logo{
    width: 5%;
}
</style>
