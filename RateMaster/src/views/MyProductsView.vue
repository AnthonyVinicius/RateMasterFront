<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import DAOService from '@/services/DAOService';
import { ref } from 'vue';

const daoProducts = new DAOService('products');

const product = ref({
  name: '',
  description: '',
  brand:'',
  price: '',
  type: '',
  image: null
});
const showAll = async() =>{
    await daoProducts.getAll(product.value)
}
</script>

<template>
    <div class="page-container">

        <TheNavbar />
        <main class="content container mt-5">
            <div>
                
            </div>
        </main>

        <TheFooter />

    </div>
</template>

<script setup>


</script>