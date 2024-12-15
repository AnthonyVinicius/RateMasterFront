<script setup>
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const daoUser = new DAOService('user');
const daoShop = new DAOService('shop');
const userData = inject('userData');  // Dados do usuário injetados no componente
const router = useRouter();

const editingName = ref(false);  // Estado para controlar o modo de edição
const editedName = ref(userData?.name || '');  // Nome que será editado

// Função para iniciar a edição do nome
const startEditing = () => {
  editingName.value = true;
};

// Função para cancelar a edição
const cancelEditing = () => {
  editingName.value = false;
  editedName.value = userData?.name || '';
};

// Função para salvar o nome alterado
const saveName = async () => {
  if (editedName.value !== userData?.name) {
    try {
      // Atualiza o nome do usuário na base de dados
      if (userData?.type === 'individual') {
        await daoUser.update(userData.id, { name: editedName.value });
      } else if (userData?.type === 'business') {
        await daoShop.update(userData.id, { name: editedName.value });
      }
      userData.name = editedName.value;
      editingName.value = false;
    } catch (error) {
      console.error('Erro ao salvar o nome:', error);
      alert('Erro ao salvar o nome.');
    }
  }
};

onMounted(() => {
  // Aqui você pode carregar os dados do usuário, caso precise de algo mais do que já foi injetado
});
</script>

<template>
  <div class="text-white d-flex flex-row profile-background">
    <div class="ms-4 mt-5 d-flex flex-column">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
        alt="Profile Logo"
        class="img-fluid img-thumbnail mt-4 mb-2 profile-logo"
      />
    </div>
    <div class="ms-3 profile-text">
      <!-- Exibe o nome do usuário -->
      <h5 v-if="!editingName">{{ userData.name }}</h5>
      <input v-if="editingName" v-model="editedName" type="text" class="form-control" />
      <p>{{ userData.email }}</p>
      <div v-if="editingName">
        <CustomButton class="button m-2" @click="saveName">
          Salvar
        </CustomButton>
        <CustomButton class="button m-2" @click="cancelEditing">
          Cancelar
        </CustomButton>
      </div>
      <div v-else>
        <CustomButton class="button m-2" @click="startEditing">
          Editar Perfil
        </CustomButton>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-end text-center mt-1 py-1 text-body">
    <div>
      <p class="mb-1 me-5 h5">253</p>
      <p class="small text-muted me-5">Produtos</p>
    </div>
  </div>

  <div class="card-body p-4">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">Imagem</th>
          <th scope="col">Nome</th>
          <th scope="col">
            <span class="m-3">Marca</span>
            <RouterLink to="/brand">
              <CustomButton>
                <i class="bi bi-plus-square-fill"></i>
              </CustomButton>
            </RouterLink>
          </th>
          <th scope="col">Preço</th>
          <th scope="col">Tipo</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in userData.products" :key="product.id">
          <td>
            <img :src="product.image" class="img-fluid product-img" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.brandName }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.description }}</td>
          <td>
            <CustomButton @click="deleteProduct(product.id)" type="button" class="btn btn-danger ms-2 me-2">
              <i class="bi bi-trash-fill"></i>
            </CustomButton>
            <CustomButton @click="goToUpdate(product.id)" type="button" class="btn btn-warning ms-2 me-2">
              <i class="bi bi-pencil-square"></i>
            </CustomButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.profile-text {
  margin-top: 130px;
}
.profile-background {
  background-color: #000;
  height: 200px;
}
.profile-logo {
  width: 150px;
  z-index: 1;
}
.product-img {
  max-width: 100px;
}
</style>
