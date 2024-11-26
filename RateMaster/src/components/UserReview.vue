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
        <p class="lead text-white pt-5 pb-3 text-resize"> {{ comment }}</p>
        <img class="img-profile rounded-circle pt-3" src="../assets/img/ProfileIcon.png" alt="Profile Icon">
        <p class="lead text-white pb-3">User</p>
    </div>
</template>

<style scoped>
.box {
    background-color: #2C3E50;
    min-height: 300px; 
    max-height: 350px; 
    overflow: hidden;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
