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
const newReview = ref({ rating: "", comment: "" });
const newResponse = ref({ comment: "" });

const fetchProductDetails = async () => {
  try {
    const productId = route.params.id;
    product.value = await daoProducts.get(productId);

    // buscar as avaliações do produto
    reviews.value = (await daoReviews.search("productId", productId)) || [];

    // calcular a média de avaliação
    if (reviews.value.length > 0) {
      averageRating.value = (
        reviews.value.reduce((sum, review) => sum + review.rating, 0) /
        reviews.value.length
      ).toFixed(1);
    } else {
      averageRating.value = 0;
    }

    // buscar o nome da empresa
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

  if (userData.value.userType === 'business') {
    alert("Seu tipo de usuário não permite essa ação");
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

const submitResponse = async (review) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    alert("Você precisa estar logado para responder a uma avaliação.");
    return;
  }

  if (userData.value.userType !== 'business') {
    alert("Apenas empresas podem responder a avaliações.");
    return;
  }

  try {
    const response = {
      userId: userData.value.id,
      userName: userData.value.name,
      comment: newResponse.value.comment,
    };

    console.log("Enviando resposta:", response); // verificacao antes de enviar
    await daoReviews.addResponse(review.id, response);
    console.log("Resposta enviada com sucesso");

    review.responses.push(response);
    newResponse.value.comment = "";
    alert("Resposta enviada com sucesso!");

  } catch (error) {
    console.error("Erro ao enviar resposta:", error);
    alert("Ocorreu um erro ao enviar sua resposta. Tente novamente.");
  }
};

onMounted(() => {
  fetchProductDetails();
});
</script>

<template>
  <div class="container pt-5">
    <button type="button" class="btn pb-3 back-button" @click="router.push('/reviews')">
      ← Voltar para os produtos
    </button>

    <div class="review-form container p-0 text-truncate rounded-4" v-if="product">
      <div class="row">

        <div class="img-container col container-fluid d-flex justify-content-center p-5 rounded-start-3">
          <img :src="product.image" class="rounded-4 product-img " :alt="product.name">
        </div>

        <div class="product-detail col container-fluid bg-white rounded-end-4 p-4">
          <div class="text-detail vstack gap-3">
            <div class="hstack">
              <h1 class="text-modified text-truncate">{{ product.name }}</h1>
              <div class="ms-auto me-3 rating">
                <div class="rating-badge fw-bold p-2 rounded-4">
                  <i class="bi bi-star-fill me-1"></i>
                  <span>{{ averageRating }}/5</span>
                </div>
              </div>
            </div>
            <p class="description text-truncate">{{ product.description }}</p>
            <p class="description text-truncate"><i class="bi bi-shop me-1"></i>{{ product.companyName }}</p>
          </div>
        </div>
      </div>
    </div>


    <div v-if="userData.userType === 'individual'">

      <form @submit.prevent="submitReview" class="p-5 mt-5 mb-5 rounded-4 bg-white review-form">
        <h3 class="fw-bold mb-3 text-modified">Deixe sua avaliação</h3>
        <div class="form-group">
          <label class="mt-2 mb-2" for="rating">Sua nota:</label>
          <br>
          <div class="mb-4 star-rating">
            <input type="radio" id="sr-5" name="star-rating" value="5" v-model="newReview.rating" />
            <label for="sr-5"><i class="bi bi-star-fill"></i></label>

            <input type="radio" id="sr-4" name="star-rating" value="4" v-model="newReview.rating" />
            <label for="sr-4"><i class="bi bi-star-fill"></i></label>

            <input type="radio" id="sr-3" name="star-rating" value="3" v-model="newReview.rating" />
            <label for="sr-3"><i class="bi bi-star-fill"></i></label>

            <input type="radio" id="sr-2" name="star-rating" value="2" v-model="newReview.rating" />
            <label for="sr-2"><i class="bi bi-star-fill"></i></label>

            <input type="radio" id="sr-1" name="star-rating" value="1" v-model="newReview.rating" />
            <label for="sr-1"><i class="bi bi-star-fill"></i></label>
          </div>
        </div>

        <div class="mb-3">
          <label class="mb-2" for="comment">Seu comentário:</label>
          <textarea class="container-fluid rounded-2 p-1" v-model="newReview.comment" id="comment" rows="4" required
            placeholder="Compartilhe sua experiência com o produto..."></textarea>
        </div>
        <div class="d-flex">
          <CustomButton class="shadow-sm">Enviar Avaliação</CustomButton>
        </div>
      </form>
    </div>
    <div class="reviews-list mt-5">
      <h2 class="mb-4 text-modified">Avaliações dos Clientes</h2>
      <div v-if="reviews.length === 0" class="mb-5">
        Ainda não há avaliações para este produto.
      </div>
      <div v-else class="row gap-4">
        <div v-for="review in reviews" :key="review.id" class="col bg-white rounded-3 pb-4 pt-4 pe-4 ps-4 mb-5 review-form">
          <div class="vstack gap-4 fs-6">
            <div class="hstack gap-1">
              <i class="bi bi-star-fill star" v-for="n in review.rating" :key="n"></i>
              <div class="ms-auto description">{{ review.userName }}</div>
            </div>
            <p class="review-comment">{{ review.comment }}</p>

            <div v-if="review.responses && review.responses.length > 0" class="responses mt-3">
              <h5 class="fw-bold">Respostas:</h5>
              <div v-for="(response, index) in review.responses" :key="index" class="response">
                <div class="response-user-name">{{ response.userName }}:</div>
                <p class="response-comment">{{ response.comment }}</p>
              </div>
            </div>

            <div v-if="userData.userType === 'business' && review.productId && product.idShop === userData.id" class="response-form mt-4">
              <form @submit.prevent="submitResponse(review)">
                <textarea v-model="newResponse.comment" placeholder="Digite sua resposta..."></textarea>
                <button type="submit">Enviar Resposta</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-form {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.img-container {
  background: #f8f9fa;
}

.product-img {
  width: auto;
  height: auto;
  max-width: 400px;
}

.rating-badge {
  background: #fff8e5;
  color: #eab308;
}

.text-detail {
  font-size: 14pt;
}

.back-button:hover {
  color: #333;
}

.star {
  color: #eab308;
}

.description, label {
  color: #666;
}

.text-modified {
  color: #2c3e50;
  font-weight: 600;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 1.1rem;
  padding: 0;
  transition: color 0.3s ease;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #4f46e5;
}

.star-rating {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.25rem;
}

.star-rating input {
  display: none;
}

.star-rating label {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ddd;
  transition: color 0.2s ease;
}

.star-rating label:hover,
.star-rating label:hover~label,
.star-rating input:checked~label {
  color: #eab308;
}

.review-form:hover,
.product-details-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
</style>
