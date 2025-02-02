<script setup>
import TheNavbar from './TheNavbar.vue';
import TheFooter from './TheFooter.vue';
import { provide } from 'vue';
import { userData, initAuth } from '@/services/AuthService.js';

provide('userData', userData);
initAuth();
</script>

<template>
    <div class="page-container">
        <TheNavbar />
        <main class="content">
            <slot></slot>
        </main>
        <TheFooter />
    </div>
</template>

<style scoped></style>
