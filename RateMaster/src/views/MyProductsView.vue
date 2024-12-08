<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const daoProducts = new DAOService('products');

onMounted(() => {
  showAll();
})

const products = ref([]);

const showAll = async () => {
  products.value = await daoProducts.getAll()
}

const deleteProduct = async (id) => {
  try {
    await daoProducts.delete(id)
    products.value = products.value.filter(product => product.id !== id);
    alert('Produto removido com sucesso!');
  } catch (error) {
    console.error(error);
    alert("Erro ao remover o produto")
  }
}

const goToUpdate = (productId) => {
  router.push({ name: 'updateProducts', params: { id: productId } });
};
</script>

<template>

  <BaseLayout>
    <div class="content container-fluid mt-5">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Imagem</th>
            <th scope="col">Nome</th>
            <th scope="col">Marca</th>
            <th scope="col">Preço</th>
            <th scope="col">Tipo</th>
            <th scope="col">Descrição</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <img :src="product.image" class="img-fluid" style="max-width: 100px;" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.description }}</td>
            <td>
              <button @click="deleteProduct(product.id)" type="button" class="btn btn-danger ms-2 me-2"><i
                  class="bi bi-trash-fill"></i></button>
              <button @click = "goToUpdate(product.id)"  type="button" class="btn btn-danger ms-2 me-2"><i
                  class="bi bi-pencil-square"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
 </BaseLayout>
</template>

<style scoped>

</style>
