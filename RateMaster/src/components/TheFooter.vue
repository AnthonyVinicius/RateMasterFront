<template>
    <footer class="footer-container">
        <div class="footer-content">
            <div class="brand">
                <img class="logo" src="/src/assets/img/Icon.png" alt="Logo da Empresa">
                <h1 class="brand-name">RateMaster</h1>
            </div>
            <div class="social-links">
                <a href="https://facebook.com" target="_blank">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com" target="_blank">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>©{{ new Date().getFullYear() }} Ratemaster. Todos os direitos reservados.</p>
        </div>
    </footer>
</template>

<style scoped>
.footer-container {
    background: linear-gradient(135deg, #1E2A38, #34495E);
    color: #FFF;
    padding: 20px 0;
    text-align: center;
    position: relative;
    width: 100%;
    bottom: 0;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.brand {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo {
    width: 50px;
    height: auto;
}

.brand-name {
    font-size: 1.8rem;
    font-weight: bold;
}

.social-links {
    display: flex;
    gap: 15px;
    font-size: 1.5rem;
}

.social-links a {
    color: #FFF;
    transition: transform 0.3s ease, color 0.3s ease;
}

.social-links a:hover {
    transform: scale(1.2);
    color: #1ABC9C;
}

.footer-bottom {
    margin-top: 15px;
    font-size: 0.9rem;
    opacity: 0.8;
}
</style>
