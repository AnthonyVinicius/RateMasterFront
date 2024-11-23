<script>
export default {
    name: 'UserReview',
    props: {
        comment: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <div class="container-fluid d-flex flex-column align-items-center box rounded-4 mb-5">
        <p class="lead text-white pt-4 pb-3 text-resize"> {{ comment }}</p>
        <img class="img-profile rounded-circle" src="../assets/ProfileIcon.png" alt="Profile Icon">
        <p class="lead text-white pb-3">User</p>
    </div>
</template>

<style scoped>
.box {
    background-color: #2C3E50;
    min-height: 200px; /* Altura mínima */
    max-height: 250px; /* Altura máxima */
    overflow: hidden; /* Esconde conteúdo que ultrapassar */
    text-align: center;
}


.text-resize {
    font-size: calc(14px + 0.2vw); /* Ajusta dinamicamente o tamanho com base na largura da viewport */
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis; /* Mostra "..." no final caso o texto seja muito grande */
}
</style>
