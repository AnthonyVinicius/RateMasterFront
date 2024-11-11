<script setup>
import { RouterLink } from 'vue-router';
+

</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <RouterLink to="/">
        <img src="../assets/Logo.png" alt="Logo">
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
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
          <input class="form-control me-2 b" type="search" placeholder="Search" aria-label="Search">
          <Button text="Search" class="button" />
        </form>

      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #2C3E50;
  
  & a {
    color: white;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  & a:hover {
    transform: scale(1.1);
  }
  & img {
  width: 80px;
  margin-left: 10px;
}
}



</style>