<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted } from 'vue';

const daoProducts = new DAOService('products');

onMounted(() => {
    showAll();
})

const products = ref([]);

const showAll = async () => {
    products.value = await daoProducts.getAll()
}


</script>

<template>
    <div class="page-container">
      <TheNavbar />
      <main class="content container-fluid mt-5">
        <!-- Tabela Bootstrap -->
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Imagem</th>
              <th scope="col">Nome</th>
              <th scope="col">Marca</th>
              <th scope="col">Preço</th>
              <th scope="col">Tipo</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <!-- Iterar sobre os produtos -->
            <tr v-for="product in products" :key="product.id">
              <td>
                <img :src="product.image" class="img-fluid" style="max-width: 100px;" />
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.brand }}</td>
              <td>R${{ product.price }}</td>
              <td>{{ product.type }}</td>
              <td>{{ product.description }}</td>
            </tr>
          </tbody>
        </table>
      </main>
      <TheFooter />
    </div>
  </template>

<script setup>


</script>