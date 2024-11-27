<script setup>
import { RouterLink } from 'vue-router';
import NavButton from './NavButton.vue';
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <RouterLink to="/">
        <img src="../assets/img/Logo.png" alt="Logo" class="logo">
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav d-flex gap-3 me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/reviews">Reviews</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/registerProduct">Register Product</RouterLink>
          </li>
        </ul>
        <form class="d-flex search-form" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <NavButton text="Search" class="button" />
          
          <div v-if="true">
            
            <RouterLink to="/profile" class="profile-link">
              <img src="../assets/img/ProfileIcon.png" alt="Profile" class="profile-image" />
            </RouterLink>
          </div>
          
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #2C3E50;
  padding: 10px 20px;
}

.nav-link{
  color: white;
  font-size: 16px;
  padding: 8px 12px;
  margin: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  background-color: #34495E; 
  color: white;
  border-radius: 5px;
  transform: scale(1.1);
}

.logo {
  width: 80px;
  margin-left: 20px;
  margin-right: 20px;
}

.profile-image {
  width: 50px;
  height: 50px;
  margin-left: 20px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.profile-image:hover{
  transform: scale(1.1);
}
</style>




