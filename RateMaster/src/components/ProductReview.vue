<template>
  <div class="shop-container">
    <aside class="filters">
      <h3>Filtros</h3>
      <div class="filter-section">
        <h4>Preço</h4>
        <label><input type="checkbox" v-model="filters.price" value="0-50"> R$0 - R$50</label>
        <label><input type="checkbox" v-model="filters.price" value="51-100"> R$51 - R$100</label>
        <label><input type="checkbox" v-model="filters.price" value="101+"> R$101+</label>
      </div>
      
      <div class="filter-section">
        <h4>Nota</h4>
        <label class="star"><input type="checkbox" v-model="filters.rating" value="5"> ★★★★★</label>
        <label class="star"><input type="checkbox" v-model="filters.rating" value="4"> ★★★★</label>
        <label class="star"><input type="checkbox" v-model="filters.rating" value="3"> ★★★ </label>
        <label class="star"><input type="checkbox" v-model="filters.rating" value="2"> ★★ </label>
        <label class="star"><input type="checkbox" v-model="filters.rating" value="1"> ★ </label>
      </div>
    </aside>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-review" @click="goToDetails(product.id)">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <div class="rating">
            <span class="star">★</span> {{ product.rating }}/5
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const filters = ref({
  price: [],
  rating: []
});

const products = ref([
  {
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4.6,
    image: 'src/assets/img/product-image.png'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4.8,
    image: 'src/assets/img/product-image.png'
  },
]);

const goToDetails = (productId) => {
  router.push({ name: 'productDetail', params: { id: productId}})
}
</script>

<style scoped>
.shop-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.filters {
  width: 250px;
  flex-shrink: 0;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h4 {
  margin-bottom: 0.5rem;
}

.filter-section label {
  display: block;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  flex: 1;
}

.product-review {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.product-image {
  margin-bottom: 1rem;
  text-align: center;
}

.product-image img {
  border-radius: 8px;
  max-width: 100%;
  height: auto;
}

.product-info {
  flex: 1;
}

.product-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.product-info p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.star {
  color: #EAB308;
}

@media (max-width: 768px) {
  .shop-container {
    flex-direction: column;
  }

  .filters {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>