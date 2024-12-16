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
  image: null
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
};


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      product.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
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
            <div class="card-body">
              <h5 class="card-title">Anexar imagem</h5>
              <input type="file" @change="handleImageUpload" class="form-control" />
              <div v-if="product.image" class="mt-3">
                <img :src="product.image" alt="Product Preview" class="img-fluid" />
              </div>
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
