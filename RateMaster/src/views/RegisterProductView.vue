<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import NavButton from '@/components/NavButton.vue';
</script>

<script>
export default {
  data() {
    return {
      productName: '',
      description: '',
      price: '',
      type: 'product',
      image: null,
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    formatPrice(event) {
      let value = event.target.value.replace(/\D/g, ''); 
      if (value.length > 2) {
        value = value.slice(0, value.length - 2) + ',' + value.slice(value.length - 2);
      }
      this.price = value ? 'R$ ' + value : '';
    },
    submitForm() {
      const productData = {
        productName: this.productName,
        description: this.description,
        price: this.price,
        type: this.type,
        image: this.image,
      };
      console.log('Form submitted:', productData);
    },
  },
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
            <h5 class="card-title">Anexar imagen</h5>
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
            <h5 class="card-title">Registrar Produto</h5>
            <form @submit.prevent="submitForm">
              
              <div class="mb-3">
                <label for="productName" class="form-label">Nome do produto</label>
                <input
                  v-model="productName"
                  type="text"
                  class="form-control"
                  id="productName"
                  placeholder="Digite o nome do produto."
                  required
                />
              </div>

              
              <div class="mb-3">
                <label for="description" class="form-label">Descrição</label>
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Digite a descrição do seu produto"
                  required
                />
              </div>

              
              <div class="mb-3">
                <label for="price" class="form-label">Preço</label>
                <input
                  v-model="price"
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="R$ 0,00"
                  required
                  @input="formatPrice"
                />
              </div>

              
              <div class="mb-3">
                <label for="type" class="form-label">Tipo</label>
                <select v-model="type" class="form-select" id="type" required>
                  <option value="product">Produto</option>
                  <option value="service">Serviço</option>
                </select>
              </div>

              
              <NavButton text="Finalizar" class="button container-fluid" />
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
