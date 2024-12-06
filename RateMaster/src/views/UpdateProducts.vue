<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref } from 'vue';

const daoProducts = new DAOService('products');


const product = ref({
  name: '',
  description: '',
  brand: '',
  price: '',
  type: '',
  image: null
});

const submit = async () => {
 
  if (!product.value.name || !product.value.description || !product.value.price || !product.value.brand || !product.value.type) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  await daoProducts.update(product.value);
  alert('Produto cadastrado com sucesso!');
}

const image = ref('');

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result;
      product.value.image = image.value;
    };
    reader.readAsDataURL(file);
  }
};

const formatPrice = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  if (value.length > 2) {
    value = value.slice(0, value.length - 2) + ',' + value.slice(value.length - 2);
  }
  product.value.price = value ? 'R$ ' + value : '';
};
</script>

<template>
  <div class="page-container">

    <TheNavbar />
    <main class="content container mt-5">
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
                  <label for="productName" class="form-label">Nome do produto</label>
                  <input v-model="product.name" type="text" class="form-control"
                    placeholder="Digite o nome do produto." required />
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Descrição</label>
                  <input v-model="product.description" type="text" class="form-control"
                    placeholder="Digite a descrição do seu produto" required />
                </div>

                <div class="mb-3">
                  <label for="price" class="form-label">Preço</label>
                  <input v-model="product.price" type="text" class="form-control" placeholder="R$ 0,00" required
                    @input="formatPrice" />
                </div>

                <div class="mb-3">
                  <label for="brand" class="form-label">Marca</label>
                  <select v-model="product.brand" class="form-select" required>
                    <option value="Petinho">Petinho</option>
                    <option value="Ouro Verde">Ouro Verde</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="type" class="form-label">Tipo</label>
                  <select v-model="product.type" class="form-select" required>
                    <option value="Produto">Produto</option>
                    <option value="Serviço">Serviço</option>
                  </select>
                </div>

                <CustomButton text="Finalizar" class="button container-fluid" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <TheFooter />

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
