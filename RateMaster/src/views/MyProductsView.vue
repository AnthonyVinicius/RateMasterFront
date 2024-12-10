<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const daoProducts = new DAOService('products');
const daoBrands = new DAOService('brands');

const products = ref([]);
const brandMap = ref({});

const loadBrands = async () => {
    try {
        const brands = await daoBrands.getAll();
        brandMap.value = brands.reduce((map, brand) => {
            map[brand.id] = brand.name;
            return map;
        }, {});
    } catch (error) {
        console.error("Erro ao carregar marcas:", error);
    }
};

const showAll = async () => {
    await loadBrands();
    const allProducts = await daoProducts.getAll();
    products.value = allProducts.map(product => {
        product.brandName = brandMap.value[product.brand] || 'Sem Marca';
        return product;
    });
};

const deleteProduct = async (id) => {
  if (confirm('Tem certeza de que deseja remover este Produto?')) {
    try {
      await daoProducts.delete(id);
      products.value = products.value.filter(product => product.id !== id);
      alert('Produto removido com sucesso!');
    } catch (error) {
      console.error(error);
      alert("Erro ao remover o produto");
    }
  }
};

const goToUpdate = (productId) => {
  router.push({ name: 'updateProducts', params: { id: productId } });
};

onMounted(() => {
  showAll();
});
</script>

<template>
  <BaseLayout>
    <div class="content container-fluid mt-3">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Imagem</th>
            <th scope="col">Nome</th>
            <th scope="col">
              <span class="m-3">Marca</span>
              <RouterLink to="/brand">
                <CustomButton>
                  <i class="bi bi-plus-square-fill"></i>
                </CustomButton>
              </RouterLink>
            </th>
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
            <td>{{ product.brandName }}</td> 
            <td>{{ product.price }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.description }}</td>
            <td>
              <CustomButton @click="deleteProduct(product.id)" type="button" class="btn btn-danger ms-2 me-2">
                  <i class="bi bi-trash-fill"></i>
              </CustomButton>
              <CustomButton @click="goToUpdate(product.id)" type="button" class="btn btn-warning ms-2 me-2">
                  <i class="bi bi-pencil-square"></i>
              </CustomButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseLayout>
</template>

<style scoped>
</style>
