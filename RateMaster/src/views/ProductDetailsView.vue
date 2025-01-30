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

onMounted(() => {
  fetchProductDetails();
});
</script>

<template>
  <h1 class="text-center mt-5">Detalhes de Produtos</h1>
  <br />
  <div class="container">
    <button type="button" class="btn pb-3" @click="router.push('/reviews')">
      ← Voltar para os produtos
    </button>

    <div class=" container bg-white p-4 rounded-2 shadow-sm" v-if="product">

      <div class="row">
        <div class="col">
            <img :src="product.image" class="card-img-top rounded-2 mb-2 product-img" :alt="product.name">
            <div class="vstack">
              <div class="hstack">
                <h1 class="fw-bold">{{ product.name }}</h1>
                <div class="ms-auto me-3 rating">
                  <span class="star"><i class="bi bi-star-fill"></i></span> {{ averageRating }}/5
                </div>
              </div>
                <p class="description">{{ product.description }}</p>
                <p class="description"><strong>Loja:</strong> {{ product.companyName }}</p>
              </div>
        </div>

          <div class="col" v-if="userData.userType === 'individual'">
            <div class="reviews-section" >
              <h2 class="fw-bold mb-3">Avaliação</h2>

              <form @submit.prevent="submitReview" class="pb-4 p-2 rounded-2 shadow-sm review-form">
                <div class="form-group">
                  <label class="mt-2 mb-2" for="rating">Nota:</label>
                  <br>
                  <div class="mb-2 star-rating">
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
                  <label class="mb-2" for="comment">Suas Avaliações:</label>
                  <textarea class="container-fluid rounded-2 p-1" v-model="newReview.comment" id="comment" rows="4" required
                    placeholder="Escreva sua avaliação aqui"></textarea>
                </div>
                <div class="d-flex">
                  <CustomButton class="ms-auto shadow-sm">Enviar Avaliação</CustomButton>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
    <div class="reviews-list mt-3">
      <div v-for="review in reviews" :key="review.id" class="mb-3 p-3 rounded-2 bg-white review-item shadow-sm">
          <div class="d-flex">
            <span class="star ms-1" v-for="n in review.rating" :key="n"><i class="bi bi-star-fill"></i></span>
            <span class="ms-auto review-author">Por: {{ review.userName }}</span>
          </div>
        <p class="review-comment">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-button:hover {
  color: #333;
}

.star {
  color: #eab308;
}

.description {
  color: #666;
}

.review-form {
  background: #f5f5f5;
}

.star-rating {
  position: relative;
  display: inline-flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  font-size: 18px;
}

input {
  position: absolute;
  opacity: 0;
}

input:checked~label {
  color: gold;
}

input:hover~label {
  color: goldenrod;
  transition: none;
}

label {
  color: grey;
}

</style>
