<script setup>
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const daoProducts = new DAOService('products');
const daoBrands = new DAOService('brands');
const userData = inject('userData');

const product = ref({
  idShop: '',
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
  product.value.idShop = userData.value.id;
  product.value.name = product.value.name.trim();
  product.value.description = product.value.description.trim();
  product.value.price = product.value.price.trim();
  product.value.brand = product.value.brand.trim();
  product.value.type = product.value.type.trim();

  if (!product.value.idShop || !product.value.name || !product.value.description ||
    !product.value.price || !product.value.brand || !product.value.type) {
    alert('Please fill in all required fields!');
    return;
  }

  await daoProducts.insert(product.value);
  alert('Product registered successfully!');

  product.value = {
    idShop: '',
    name: '',
    description: '',
    brand: '',
    price: '',
    type: '',
    image: ''
  };
};

const formatPrice = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  const numericValue = Number(value) / 100;
  product.value.price = numericValue
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericValue)
    : '';
};
</script>

<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container">
      <button type="button" class="btn pb-3 back-button" @click="router.push('/myProfile')">
      ← Voltar para os produtos
    </button>

      <div class="row g-4">

        <div class="col-12 col-lg-5">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h5 class="card-title mb-4">Imagem do Produto</h5>
              <div class="image-preview rounded bg-light mb-3 d-flex align-items-center justify-content-center"
                :style="{ backgroundImage: product.image ? `url(${product.image})` : 'none' }">
                <div v-if="!product.image" class="text-center text-secondary">
                  <i class="bi bi-image fs-1"></i>
                  <p class="mt-2 mb-0">Pré-visualização</p>
                </div>
                <img v-else :src="product.image" alt="Product preview" class="img-fluid rounded" />
              </div>
              <div class="form-floating">
                <input v-model="product.image" type="text" class="form-control" id="imageUrl"
                  placeholder="Enter image URL" />
                <label for="imageUrl">Image URL</label>
              </div>
            </div>
          </div>
        </div>

      
        <div class="col-12 col-lg-7">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h5 class="card-title mb-4">Registrar Produto</h5>
              <form @submit.prevent="submit">
                <div class="form-floating mb-3">
                  <input v-model="product.name" type="text" class="form-control" id="productName"
                    placeholder="Enter product name" required />
                  <label for="productName">Nome do Produto</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea v-model="product.description" class="form-control" id="description"
                    placeholder="Enter product description" style="height: 100px" required></textarea>
                  <label for="description">Descrição</label>
                </div>

                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                      <input v-model="product.price" type="text" class="form-control p-3" placeholder="R$ 0,00" required @input="formatPrice" />
                  </div>

                  <div class="col-md-6">
                    <div class="form-floating">
                      <select v-model="product.type" class="form-select" id="type" required>
                        <option value="">Selecione o tipo</option>
                        <option value="Product">Produto</option>
                        <option value="Service">Serviço</option>
                      </select>
                      <label for="type">Tipo</label>
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="d-flex gap-2">
                    <div class="form-floating flex-grow-1">
                      <select v-model="product.brand" class="form-select" id="brand" required>
                        <option value="">Selecione a marca</option>
                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                          {{ brand.name }}
                        </option>
                      </select>
                      <label for="brand">Marca</label>
                    </div>
                    <RouterLink to="/brand" class="d-flex align-items-center">
                      <CustomButton>
                        <i class="bi bi-plus-lg"></i>
                      </CustomButton>
                    </RouterLink>
                  </div>
                </div>

                <CustomButton class="button container-fluid py-3">
                  Registrar Produto
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-preview {
  height: 300px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.form-control:focus,
.form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 1.1rem;
  padding: 0;
  transition: color 0.3s ease;
}

.btn {
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  transform: translateY(-1px);
}

@media (max-width: 991.98px) {
  .image-preview {
    height: 250px;
  }
}
</style>