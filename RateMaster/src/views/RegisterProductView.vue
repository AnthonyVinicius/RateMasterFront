<script setup>
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted, inject } from 'vue';

const daoProducts = new DAOService('products');
const daoBrands = new DAOService('brands');
const userData = inject('userData')

const product = ref({
  idShop:'',
  name: '',
  description: '',
  brand: '',
  price: '',
  type: '',
  image: ''
});

const brands = ref([]);

const loadBrands = async () => {
  brands.value = await daoBrands.getAll();
};

onMounted(() => {
  loadBrands();
});

const submit = async () => {
  product.value.idShop = userData.value.id
  product.value.name = product.value.name.trim();
  product.value.description = product.value.description.trim();
  product.value.price = product.value.price.trim();
  product.value.brand = product.value.brand.trim();
  product.value.type = product.value.type.trim();

  if (!product.value.idShop || !product.value.name || !product.value.description || !product.value.price || !product.value.brand || !product.value.type) {
    console.log(userData.value.id)
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  await daoProducts.insert(product.value);
  alert('Produto cadastrado com sucesso!');

  product.value.idShop = null
  product.value.name = null
  product.value.description = null
  product.value.price = null
  product.value.brand = null
  product.value.type = null
};

const formatPrice = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  const numericValue = Number(value) / 100;
  product.value.price = numericValue
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue)
    : '';
};
</script>

<template>
    <div class="container mt-5">
      <div class="row">

        <div class="col-md-6">
          <div class="card">
            <div class="mb-3">
              <h5 class="card-title">Link da imagem</h5>
              <input v-model="product.image" type="text" class="form-control" placeholder="Insira o Link do produto." required />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Registrar Produto</h5>
              <form @submit.prevent="submit">

                <div class="mb-3">
                  <label for="productName" class="form-label">Nome do produto</label>
                  <input v-model="product.name" type="text" class="form-control" placeholder="Digite o nome do produto." required />
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Descrição</label>
                  <input v-model="product.description" type="text" class="form-control" placeholder="Digite a descrição do seu produto" required />
                </div>

                <div class="mb-3">
                  <label for="price" class="form-label">Preço</label>
                  <input v-model="product.price" type="text" class="form-control" placeholder="R$ 0,00" required @input="formatPrice" />
                </div>

                <div class="mb-3">
                  <label for="brand" class="form-label">Marca</label>
                  <div class="d-flex align-items-center">
                    <select v-model="product.brand" class="form-select me-2" required>
                      <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                        {{ brand.name }}
                      </option>
                    </select>
                    <RouterLink to="/brand">
                      <CustomButton class="btn btn-primary">
                        <i class="bi bi-plus-square-fill"></i>
                      </CustomButton>
                    </RouterLink>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="type" class="form-label">Tipo</label>
                  <select v-model="product.type" class="form-select" required>
                    <option value="Produto">Produto</option>
                    <option value="Serviço">Serviço</option>
                  </select>
                </div>

                <CustomButton class="button container-fluid"> Finalizar </CustomButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
  padding: auto;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

button:hover {
  transform: scale(1.01);
}

.card .mb-3{
  margin: 0.5rem 1rem;
}

.card input{
  margin-top: 0.5rem;
  padding: 0.5rem;
}

</style>
