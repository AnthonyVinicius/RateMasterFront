<script setup>
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseLayout from '@/components/BaseLayout.vue';

const route = useRoute();
const router = useRouter();

const daoUsers = new DAOService('users');

const user = ref({
  name: '',
  email:'',
});

const fetchUser = async () => {
  const userId = route.params.uid;

  if (!userId) {
    alert('Usuário não encontrado!');
    router.push({ name: 'myProfile' });
    return;
  }

  try {
    const fetchedUser = await daoUsers.get(userId);
    user.value = { ...fetchedUser };
  } catch (error) {
    console.error(error);
    alert('Erro ao encontrar o usuário!');
    router.push({ name: 'myProfile' });
  }
};

const submit = async () => {
  if (!user.value.name || !user.value.email ) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  try {

    await daoUsers.update(user.value.uid, user.value);
    alert('Usuário atualizado com sucesso!');
    router.push("/myProfile")
  } catch (error) {
    console.error(error);
    alert('Erro ao atualizar o usuário.');
  }
};


onMounted(() => {
  fetchUser();
});
</script>

<template>
  <BaseLayout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Anexar imagem</h5>
              <input type="file" @change="handleImageUpload" class="form-control" />
              <div v-if="image" class="mt-3">
                <img :src="image" alt="Product Preview" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Editar Produto</h5>
              <form @submit.prevent="submit">

                <div class="mb-3">
                  <label for="productName" class="form-label">Nome do Usuário</label>
                  <input v-model="user.name" type="text" class="form-control" placeholder="Digite o nome do usuário."
                    required />
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Descrição</label>
                  <input v-model="user.email" type="email" class="form-control"
                    placeholder="Digite o seu email" required />
                </div>
                <CustomButton class="button container-fluid">Salvar</CustomButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

img {
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

button:hover {
  transform: scale(1.01);
}
</style>
