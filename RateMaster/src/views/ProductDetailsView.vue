<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import DAOService from "@/services/DAOService";
import CustomButton from "@/components/CustomButton.vue";
import { auth } from "@/firebase.js";

const router = useRouter();
const route = useRoute();
const averageRating = ref(0);

const daoProducts = new DAOService("products");
const daoReviews = new DAOService("reviews");
const daoShops = new DAOService('shop');
const userData = inject('userData');


const product = ref(null);
const reviews = ref([]);
const newReview = ref({
  rating: "",
  comment: "",
});

const fetchProductDetails = async () => {
  try {
    const productId = route.params.id;
    product.value = await daoProducts.get(productId);

    // Buscar as avaliações do produto
    reviews.value = (await daoReviews.search("productId", productId)) || [];

    // Calcular a média de avaliação
    if (reviews.value.length > 0) {
      averageRating.value = (
        reviews.value.reduce((sum, review) => sum + review.rating, 0) /
        reviews.value.length
      ).toFixed(1);
    } else {
      averageRating.value = 0;
    }

    // Buscar o nome da empresa
    const company = await daoShops.get(product.value.idShop);
    product.value.companyName = company ? company.name : 'Empresa desconhecida';

  } catch (error) {
    console.error("Erro ao carregar os detalhes do produto:", error);
  }
};

const submitReview = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    alert("Você precisa estar logado para enviar uma avaliação.");
    return;
  }

  if (!userData.value) {
    console.log(userData[0])
    alert("Dados do usuário não estão disponíveis.");
    return;
  }

  const review = {
    productId: product.value.id,
    userId: userData.value.id,
    userName: userData.value.name,
    rating: Number(newReview.value.rating),
    comment: newReview.value.comment,
  };

  try {
    await daoReviews.insert(review);

    // atualiza localmente a lista de avaliações
    reviews.value.unshift(review);

    averageRating.value = (
      reviews.value.reduce((sum, review) => sum + review.rating, 0) /
      reviews.value.length
    ).toFixed(1);

    newReview.value.comment = "";
    newReview.value.rating = "";

    alert("Avaliação enviada com sucesso!");
    console.log("id", userData.value.id);
  } catch (error) {
    console.log(userData.value);
    console.error("Erro ao enviar avaliação:", error);
    alert("Ocorreu um erro ao enviar sua avaliação. Tente novamente.");
  }
};

onMounted(() => {
  fetchProductDetails();
});
</script>

<template>
    <h1 class="text-center">Detalhes de Produtos</h1>
    <br />
    <div class="product-details">
      <button class="back-button" @click="router.push('/reviews')">
        ← Voltar para os produtos
      </button>

      <div class="product-container" v-if="product">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>

        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <div class="rating">
            <span class="star">★</span> {{ averageRating }}/5
          </div>
          <p class="description">{{ product.description }}</p>
          <p class="description"><strong>Loja:</strong> {{ product.companyName }}</p>

          <div class="reviews-section">
            <h2>Avaliação</h2>

            <form @submit.prevent="submitReview" class="review-form">
              <div class="form-group">
                <label for="rating">Nota:</label>
                <div class="star-rating">
                  <input
                    type="radio"
                    id="sr-5"
                    name="star-rating"
                    value="5"
                    v-model="newReview.rating"
                  />
                  <label for="sr-5">★</label>

                  <input
                    type="radio"
                    id="sr-4"
                    name="star-rating"
                    value="4"
                    v-model="newReview.rating"
                  />
                  <label for="sr-4">★</label>

                  <input
                    type="radio"
                    id="sr-3"
                    name="star-rating"
                    value="3"
                    v-model="newReview.rating"
                  />
                  <label for="sr-3">★</label>

                  <input
                    type="radio"
                    id="sr-2"
                    name="star-rating"
                    value="2"
                    v-model="newReview.rating"
                  />
                  <label for="sr-2">★</label>

                  <input
                    type="radio"
                    id="sr-1"
                    name="star-rating"
                    value="1"
                    v-model="newReview.rating"
                  />
                  <label for="sr-1">★</label>
                </div>
              </div>

              <div class="form-group">
                <label for="comment">Suas Avaliações</label>
                <textarea
                  v-model="newReview.comment"
                  id="comment"
                  rows="4"
                  required
                  placeholder="Escreva sua avaliação aqui"
                ></textarea>
              </div>
              <CustomButton> Enviar Avaliação</CustomButton>
            </form>

            <div class="reviews-list">
              <div
                v-for="review in reviews"
                :key="review.id"
                class="review-item"
              >
                <div class="review-header">
                  <div class="review-rating">
                    <span class="star" v-for="n in review.rating" :key="n"
                      >★</span
                    >
                  </div>
                  <span class="review-author">Por: {{ review.userName }}</span>
                </div>
                <p class="review-comment">{{ review.comment }}</p>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.product-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
}

.back-button:hover {
  color: #333;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image img {
  width: 100%;
  border-radius: 8px;
}

.product-info h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.star {
  color: #eab308;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.reviews-section {
  margin-top: 3rem;
}

.reviews-section h2 {
  margin-bottom: 1.5rem;
}

.review-form {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.submit-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {
  background-color: #4338ca;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-date {
  color: #666;
  font-size: 0.9rem;
}

.review-comment {
  color: #333;
  line-height: 1.5;
}

.star-rating {
  position: relative;
  display: inline-flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin: 0 -0.25rem;
  font-size: 25px;
}

input {
  position: absolute;
  opacity: 0;
}

input:checked ~ label {
  color: gold;
}

input:hover ~ label {
  color: goldenrod;
  transition: none;
}

input:focus-visible + label {
  outline-offset: 1px;
  outline: #4f46e5 solid 2px;
}

label {
  cursor: pointer;
  color: grey;
  padding: 0 0.25rem;
  transition: color 0.15s;
}

label:active {
  color: darkgoldenrod !important;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }

  .product-details {
    padding: 1rem;
  }
}
</style>
