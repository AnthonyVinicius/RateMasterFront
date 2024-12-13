<template>
  <div class="shop-container">
    <aside class="filters">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Buscar" class="search-input" />
      </div>
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
      <div v-for="product in filterProducts" :key="product.id" class="product-review" @click="goToDetails(product.id)">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}</p>
          <div class="rating">
            <span class="star">★</span> {{ product.averageRating }}/5
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import DAOService from '@/services/DAOService';
import { useRouter } from 'vue-router';

const daoProducts = new DAOService('products');
const daoReviews = new DAOService("reviews");
const router = useRouter();

const products = ref([]);
const filters = ref({
  price: [],
  rating: []
});
const reviews = ref([]);

const searchQuery = ref('');

const fetchProducts = async () => {
  try {
    products.value = await daoProducts.getAll();

    reviews.value = await daoReviews.getAll();

    products.value.forEach(product => {
      const productReviews = reviews.value.filter(review => review.productId === product.id);
      const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
      if (productReviews.length > 0){
        product.averageRating = (totalRating / productReviews.length).toFixed(1);
      } else {
        product.averageRating = 0;
      }
    });

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
};

const normalizePrice = (price) => {
  if (!price) return 0;
  return parseFloat(price.replace('R$', '').replace(',', '.').trim());
};

const filterProducts = computed(() => {
  return products.value.filter(product => {
    const matchSearch = !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    const price = normalizePrice(product.price);
    const equalPrice = filters.value.price.length === 0 || filters.value.price.some(priceRange => {
      if (priceRange === "0-50") return price >= 0 && price <= 50;
      if (priceRange === "51-100") return price >= 51 && price <= 100;
      if (priceRange === "101+") return price >= 101;
    });


    const equalRating = filters.value.rating.length === 0 || filters.value.rating.some(rating => {
      return parseFloat(rating) === Math.floor(product.averageRating);
    })
    return equalPrice && equalRating && matchSearch;
  })
})


const goToDetails = (productId) => {
  router.push({ name: 'productDetail', params: { id: productId } });
};

onMounted(() => {
  fetchProducts();
});
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

.search-bar {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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