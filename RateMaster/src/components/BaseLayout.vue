<script setup>
import TheNavbar from './TheNavbar.vue';
import TheFooter from './TheFooter.vue';
</script>

<template>
    <div class="page-container">
        <TheNavbar />
        <main class="content">
            <slot>

            </slot>
        </main>
        <TheFooter />
    </div>
</template>

<style scoped>

</style>