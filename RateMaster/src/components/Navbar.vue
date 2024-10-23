<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
<nav class="navbar navbar-expand-lg">

  <div class="container-fluid">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <RouterLink class="navbar-brand" to="#">RateMaster</RouterLink>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
            <RouterLink class="nav-link" to="#">Home</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" to="#">Reviews</RouterLink>
        </li>

        <li class="nav-item">
            <RouterLink class="nav-link" to="#">Login</RouterLink>
        </li>

      </ul>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      
    </div>
  </div>
</nav>
</template>

<style scoped>
    nav{
        background-color: #2C3E50;
    }
    nav a{
        color: #7F8C8D;
    }
</style>