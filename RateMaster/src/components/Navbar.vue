<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
<nav class="navbar navbar-expand-lg">
  <RouterLink to="/">
    <img src="../assets/Logo.png" alt="Logo">
  </RouterLink>
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
 
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

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
            <RouterLink class="nav-link" to="/register">Register Product</RouterLink>
        </li>

      </ul>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline" type="submit">Search</button>
      </form>

    </div>
  </div>
</nav>
</template>

<style scoped>
.navbar {
  background-color: #2C3E50;
}

.navbar a {
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.navbar a:hover {
  transform: scale(1.1);
}

button {
  background-color: #E74C3C;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  color: white;
  background-color: #E74C3C;
  transform: scale(1.1);
}

img{
  width: 80px;
  margin-left: 10px;
}

  </style>