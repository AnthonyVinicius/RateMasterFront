<script setup>
import { ref, onMounted, computed } from 'vue';
import DAOService from '@/services/DAOService';
import { useRouter } from 'vue-router';

const daoProducts = new DAOService('products');
const daoReviews = new DAOService('reviews');
const daoShops = new DAOService('shop');
const router = useRouter();

const products = ref([]);
const filters = ref({
  price: [],
  rating: []
});
const reviews = ref([]);
const companies = ref([]);
const searchQuery = ref('');

const fetchProducts = async () => {
  try {
    products.value = await daoProducts.getAll();
    companies.value = await daoShops.getAll();
    reviews.value = await daoReviews.getAll();

    products.value.forEach(product => {
      const productReviews = reviews.value.filter(review => review.productId === product.id);

      const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);

      const company = companies.value.find(company => company.id === product.idShop);
      product.companyName = company ? company.name : 'Empresa desconhecida';

      if (productReviews.length > 0) {
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
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.companyName.toLowerCase().includes(searchQuery.value.toLowerCase());

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

<template>
  <h1 class="text-center mt-5">Avaliações de Produtos</h1>
  <div class="shop-container">
    <aside class="filters shadow-sm">
      <h3 class="fw-bold mb-4">Filtros</h3>
      <div class="form-floating search-bar">
        <input type="search" v-model="searchQuery" class="form-control mb-3" id="floatingInput" placeholder="Buscar" />
        <label for="floatingInput"><i class="bi bi-search"></i> Buscar</label>
      </div>
      <div class="filter-section">
        <h4 class="fw-bold">Preço</h4>
        <label><input type="checkbox" v-model="filters.price" value="0-50"> R$0 - R$50</label>
        <label><input type="checkbox" v-model="filters.price" value="51-100"> R$51 - R$100</label>
        <label><input type="checkbox" v-model="filters.price" value="101+"> R$101+</label>
      </div>

      <div class="filter-section">
        <h4 class="fw-bold mb-3 mt-3">Nota</h4>
        <div class="vstack gap-3">
          <label class="star"><input type="checkbox" v-model="filters.rating" value="5"> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></label>
          <label class="star"><input type="checkbox" v-model="filters.rating" value="4"> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></label>
          <label class="star"><input type="checkbox" v-model="filters.rating" value="3"> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></label>
          <label class="star"><input type="checkbox" v-model="filters.rating" value="2"> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></label>
          <label class="star"><input type="checkbox" v-model="filters.rating" value="1"> <i class="bi bi-star-fill"></i>
          </label>
        </div>
      </div>
    </aside>


    <div class="products-grid">
      <div v-for="product in filterProducts" :key="product.id" class="product-review" @click="goToDetails(product.id)">
        <div class="container product-image">
          <img class="img-fluid" :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}</p>
          <div class="rating">
            <span class="star"><i class="bi bi-star-fill"></i></span> {{ product.averageRating }}/5
          </div>
          <p class="mt-2"><strong>Loja:</strong> {{ product.companyName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

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

.filter-section label {
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
