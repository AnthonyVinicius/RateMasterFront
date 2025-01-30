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
    <div class="container">
        <h4 class="fw-bold mt-5">Produtos</h4>

        <div class="row d-flex">
            <section class="col-md-3">
                <aside class="filters bg-white p-3 rounded-2 shadow-sm">
                    <h6 class="fw-bold mb-4">Filtros</h6>
                    <div class="form-floating search-bar">
                        <input type="search" v-model="searchQuery" class="form-control mb-3" id="floatingInput"
                            placeholder="Buscar" />
                        <label for="floatingInput"><i class="bi bi-search"></i> Buscar</label>
                    </div>
                    <div class="vstack filter-section">
                        <h6 class="fw-bold">Preço</h6>
                        <label><input type="checkbox" v-model="filters.price" value="0-50"> R$0 - R$50</label>
                        <label><input type="checkbox" v-model="filters.price" value="51-100"> R$51 - R$100</label>
                        <label><input type="checkbox" v-model="filters.price" value="101+"> R$101+</label>
                    </div>

                    <div class="filter-section">
                        <div class="vstack gap-3">
                            <h6 class="fw-bold mt-3">Nota</h6>
                            <label class="star"><input type="checkbox" v-model="filters.rating" value="5"> <i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i></label>
                            <label class="star"><input type="checkbox" v-model="filters.rating" value="4"> <i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></label>
                            <label class="star"><input type="checkbox" v-model="filters.rating" value="3"> <i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i></label>
                            <label class="star"><input type="checkbox" v-model="filters.rating" value="2"> <i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></label>
                            <label class="star"><input type="checkbox" v-model="filters.rating" value="1"> <i
                                    class="bi bi-star-fill"></i>
                            </label>
                        </div>
                    </div>
                </aside>
            </section>

            <div class="mb-5 col-md-9">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col" v-for="product in filterProducts" :key="product.id"
                        @click="goToDetails(product.id)">
                        <div class="card p-2 shadow-sm h-100">
                            <img class="rounded-2" :src="product.image" :alt="product.name">
                            <div class="card-body">
                                <div class="hstack">
                                    <h4 class="fw-bold">{{ product.name }}</h4>
                                    <div class="ms-auto me-3 rating">
                                        <span class="star"><i class="bi bi-star-fill"></i></span> {{
                                        product.averageRating }}/5
                                    </div>
                                </div>
                                <p class="card-text">{{ product.description }}</p>
                                <p class="card-text">{{ product.price }}</p>
                                <p class="card-text"><strong>Loja:</strong> {{ product.companyName }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.filter-section label {
    cursor: pointer;
}

.star {
    color: #EAB308;
}
</style>
