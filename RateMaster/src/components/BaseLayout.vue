<script setup>
import TheNavbar from './TheNavbar.vue';
import TheFooter from './TheFooter.vue';
import { auth } from '@/firebase.js';
import DAOService from "@/services/DAOService";
import { provide, ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';

// Instâncias do DAOService para buscar dados de usuário e loja
const daoUser = new DAOService("user");
const daoShop = new DAOService("shop");

const userData = ref(null); // Reativo para armazenar os dados do usuário
provide('userData', userData); // Disponibiliza userData para os componentes filhos

// Função assíncrona para buscar os dados do usuário
const fetchUserData = async (uid) => {
    try {
        const user = await daoUser.search('uid', uid);
        if (user) {
            return { ...user[0]}; // Retorna dados do usuário com tipo "user"
        }

        const shop = await daoShop.search('uid', uid);
        if (shop) {
            return { ...shop[0]}; // Retorna dados do usuário com tipo "shop"
        }

        return null; // Caso nenhum dado seja encontrado
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return null;
    }
};

// Observa mudanças na autenticação
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userInfo = await fetchUserData(user.uid);
            if (userInfo) {
                userData.value = userInfo;
            } else {
                console.warn("Nenhum dado de usuário encontrado.");
                userData.value = null;
            }
        } catch (error) {
            console.error("Erro ao processar autenticação:", error);
            userData.value = null;
        }
    } else {
        userData.value = null; // Limpa os dados se o usuário sair
    }
});
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