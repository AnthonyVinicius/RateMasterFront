<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '@/components/BaseLayout.vue';
import { auth } from '@/firebase.js';

const user = ref(null);
const router = useRouter();

const fetchUser = async () => {
  try {
    user.value = auth.currentUser;
  } catch (error) {
    console.error('Erro ao carregar as informações do usuário:', error);
    alert('Erro ao carregar informações do usuário!');
  }
};

const goToEditProfile = (userId) => {
  router.push({name: 'updateProfile', params: {uid: userId} });
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <BaseLayout>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Informações do Usuário</h5>
              <div v-if="user">
                <p><strong>Nome:</strong> {{ user.displayName }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <button class="btn btn-primary mt-3" @click="goToEditProfile(user.uid)">
                  Editar Perfil
                </button>
              </div>
              <div v-else>
                <p>Carregando informações do usuário...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.card {
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.btn {
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>