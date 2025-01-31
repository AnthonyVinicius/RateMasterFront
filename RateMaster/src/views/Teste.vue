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

const viewType = ref('columns');

const on_off = ref(false);
const newUserName = ref('');
const editedUserName = ref('');

const viewTypeColumns = () => {
    viewType.value = 'columns';
};

const viewTypeList = () => {
    viewType.value = 'list';
};
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
    <div class="text-white d-flex flex-row profile-background position-relative">
        <CustomButton class="position-absolute top-0 end-0 m-3" @click="editUserName"><i class="bi bi-pencil-square"></i></CustomButton>
        <div class="ms-4 mt-5 d-flex flex-column">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Profile Logo" class="img-fluid img-thumbnail mt-4 mb-2 rounded-pill profile-logo">
        </div>
    <div class="ms-3 profile-text">

      <h5 v-if="!on_off">{{ userData.name }}</h5>

      <input v-if="on_off" v-model="newUserName" type="text" class="form-control" />

      <p>{{ userData.email }}</p>

      <div v-if="on_off">
        <CustomButton class="button me-1" @click="updateUserName">
          Salvar
        </CustomButton>
        <CustomButton class="button" @click="cancelEditUserName">
          Cancelar
        </CustomButton>
      </div>
    </div>
  </div>    

  <div class="container-fluid pb-3 bg-white" v-if="userData?.userType !== 'individual'">
    <div class="container-fluid d-flex">
        <div class="hstack gap-1 ms-auto">
            <CustomButton class="mt-3" @click="viewTypeColumns"><i class="bi bi-layout-three-columns"></i></CustomButton>
            <CustomButton class="mt-3" @click="viewTypeList"><i class="bi bi-list-nested"></i></CustomButton>
        </div>
    </div>
    <div class="container-fluid mt-5 mb-5 col-md-9" v-if="viewType.value === 'columns'">
        <div class="row row-cols-1 row-cols-md-5 g-3">
            <div class="card text">
                <div class="card-img-overlay">
                    <h1>Registrar Produto</h1>
                    <h1>+</h1>
                </div>
            </div>
            <div v-for="product in products" :key="product.id">
                <div class="card p-2 shadow-sm h-100">
                    <div class="d-flex justify-content-center align-items-center img-container">
                        <img class="img-fluid rounded-2 product-img" :src="product.image" :alt="product.name">
                    </div>

                    <div class="card-body">
                        <div class="hstack">
                            <h4 class="fw-bold">{{ product.name }}</h4>
                        </div>
                        <p>Marca: <strong>{{ product.brandName }}</strong></p>
                        <p class="card-text">{{ product.description }}</p>
                        <p class="card-text">{{ product.price }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-3 pt-5 text-body" v-if="viewType.value == 'list'" >
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
                                    <div class="d-flex justify-content-center align-items-center img-container-list">
                        <img class="img-fluid rounded-2 product-img-list" :src="product.image" :alt="product.name">
                    </div>
                                </td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.brandName }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.type }}</td>
                                <td>{{ product.description }}</td>
                                <td>
                                    <CustomButton @click="deleteProduct(product.id)" type="button"
                                        class="btn btn-danger ms-2 me-2">
                                        <i class="bi bi-trash-fill"></i>
                                    </CustomButton>
                                    <CustomButton @click="goToUpdate(product.id)" type="button"
                                        class="btn btn-warning ms-2 me-2">
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
    max-width: 150px;
    max-width: 100%;
    max-height: 100%;
}

.img-container {
    width: 100%;
    height: 150px;
}

.img-container-list {
    
    height: 50px;
}

.product-img-list{
    max-width: 50px;
    max-width: 100%;
    max-height: 100%;
}

</style>
