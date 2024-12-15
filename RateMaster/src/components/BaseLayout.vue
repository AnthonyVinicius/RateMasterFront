<script setup>
import TheNavbar from './TheNavbar.vue';
import TheFooter from './TheFooter.vue';
import { auth } from '@/firebase.js';
import DAOService from "@/services/DAOService";
import { provide, ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';


const daoUser = new DAOService("user");
const daoShop = new DAOService("shop");
const userData = ref(null);
provide('userData', userData);

onAuthStateChanged(auth, (user) => {
    if (user) {
        userData.value = fetchUserData(user.uid);
    }
});


const fetchUserData = async (uid) => {
    try {
        let user = await daoUser.search('uid', uid);
        if (user) {
            userData.value = { ...user, userType: "user" };
            
            return userData.value;
        }

        let shop = await daoShop.search('uid', uid);
        if (shop) {
            userData.value = { ...shop, userType: "shop" };
            return userData.value;
        }

        return null;
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return null;
    }
};

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

<style scoped></style>