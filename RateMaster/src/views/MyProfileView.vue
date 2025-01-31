<script setup>
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const daoProducts = new DAOService('products');
const daoBrands = new DAOService('brands');
const daoUser = new DAOService('user');
const daoShop = new DAOService('shop');
const products = ref([]);
const brandMap = ref({});

const userData = inject('userData');


const on_off = ref(false);
const newUserName = ref('');
const editedUserName = ref('');


const editUserName = () => {
  on_off.value = true;
};

const cancelEditUserName = () => {
  on_off.value = false;
  newUserName.value = null;
};


const updateUserName = async () => {
  editedUserName.value = newUserName.value.trim();
  on_off.value = false;
  try {
    if (userData.value.userType === 'individual') {
      await daoUser.update(userData.value.id, { name: editedUserName.value });
    }
    if (userData.value.userType === 'business') {
      await daoShop.update(userData.value.id, { name: editedUserName.value });
    }
    
    userData.value.name = editedUserName.value;

    newUserName.value = null;
  } catch (error) {
    console.error("Erro ao atualizar o nome:", error);
  }
};


const loadBrands = async () => {
  try {
    const brands = await daoBrands.getAll();
    brandMap.value = brands.reduce((map, brand) => {
      map[brand.id] = brand.name;
      return map;
    }, {});
  } catch (error) {
    console.error("Erro ao carregar marcas:", error);
  }
};

const showAll = async () => {
  try {
    await loadBrands();
    products.value = await daoProducts.search('idShop', userData.value.id);

    products.value = products.value.map(product => {
      product.brandName = brandMap.value[product.brand] || 'Sem Marca';
      return product
    });
  } catch (error) {
    console.log('erro filtrado', products.value)
    console.error('Erro ao carregar produtos:', error);
  }
};

const deleteProduct = async (id) => {
  if (confirm('Tem certeza de que deseja remover este Produto?')) {
    try {
      await daoProducts.delete(id);
      products.value = products.value.filter(product => product.id !== id);
      alert('Produto removido com sucesso!');
    } catch (error) {
      console.error(error);
      alert("Erro ao remover o produto");
    }
  }
};

const goToUpdate = (productId) => {
  router.push({ name: 'updateProducts', params: { id: productId } });
};


onMounted(() => {
  showAll();
});

</script>

<template>
  <div class="text-white d-flex flex-row profile-background">
    <div class="ms-4 mt-5 d-flex flex-column">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Profile Logo"
        class="img-fluid img-thumbnail mt-4 mb-2 profile-logo">
    </div>
    <div class="ms-3 profile-text">

      <h5 v-if="!on_off">{{ userData.name }}</h5>

      <input v-if="on_off" v-model="newUserName" type="text" class="form-control" />

      <p>{{ userData.email }}</p>

      <div v-if="on_off">
        <CustomButton class="button m-2" @click="updateUserName">
          Salvar
        </CustomButton>
        <CustomButton class="button m-2" @click="cancelEditUserName">
          Cancelar
        </CustomButton>
      </div>
      <div v-else>
        <CustomButton class="button m-2" @click="editUserName">
          Editar Perfil
        </CustomButton>
      </div>
    </div>
  </div>

  <div class="mt-3 pt-5 text-body" v-if="userData?.userType !== 'individual'">
    <div>
      <div class="card-body p-4">
        <div class="table-responsive">
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
                <tr v-for="product in products" :key="product.id">
                  <td>
                    <img :src="product.image" class="img-fluid product-img rounded-2" />
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
      </div>
    </div>
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
