<template>
  <div class="product-details">
    <button class="back-button" @click="router.push('/reviews')">
      ← Back to Products
    </button>

    <div class="product-container" v-if="product">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <div class="rating">
          <span class="star">★</span> {{ product.rating }}/5
        </div>
        <p class="description">{{ product.description }}</p>

        <!-- Reviews Section -->
        <div class="reviews-section">
          <h2>Reviews</h2>

          <!-- Add Review Form -->
          <form @submit.prevent="submitReview" class="review-form">
            <div class="form-group">
              <label for="rating">Rating:</label>
              <select v-model="newReview.rating" id="rating" required>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div class="form-group">
              <label for="comment">Your Review:</label>
              <textarea
                v-model="newReview.comment"
                id="comment"
                rows="4"
                required
                placeholder="Write your review here..."
              ></textarea>
            </div>

            <button type="submit" class="submit-button">Submit Review</button>
          </form>

          <!-- Reviews List -->
          <div class="reviews-list">
            <div v-for="review in reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <div class="review-rating">
                  <span class="star" v-for="n in review.rating" :key="n"
                    >★</span
                  >
                </div>
                <span class="review-date">{{ review.date }}</span>
              </div>
              <p class="review-comment">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const product = ref(null);
const reviews = ref([
  {
    id: 1,
    rating: 5,
    comment: "Great product! Highly recommended!",
    date: "2024-03-15",
  },
  {
    id: 2,
    rating: 4,
    comment: "Good quality, but a bit pricey.",
    date: "2024-03-14",
  },
]);

const newReview = ref({
  rating: 5,
  comment: "",
});

onMounted(() => {
  // mock data
  product.value = {
    id: route.params.id,
    name: "Product " + route.params.id,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 4.6,
    image: "../src/assets/product-image.png",
  };
});

const submitReview = () => {
  const review = {
    id: reviews.value.length + 1,
    rating: Number(newReview.value.rating),
    comment: newReview.value.comment,
    date: new Date().toISOString().split("T")[0],
  };

  reviews.value.unshift(review);
  newReview.value.comment = "";
  newReview.value.rating = 5;
};
</script>

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

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }

  .product-details {
    padding: 1rem;
  }
}
</style>
