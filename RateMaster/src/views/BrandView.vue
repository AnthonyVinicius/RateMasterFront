<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const daoBrands = new DAOService('brands');

const brands = ref([]);
const newBrand = ref(''); // Nova marca a ser adicionada

onMounted(() => {
    showAllBrands();
});

// Carrega todas as marcas
const showAllBrands = async () => {
    brands.value = await daoBrands.getAll();
};

// Adiciona uma nova marca
const addBrand = async () => {
    const trimmedBrand = newBrand.value.trim();
    if (!trimmedBrand) {
        alert('Por favor, insira um nome válido para a marca.');
        return;
    }

    try {
        const addedBrand = await daoBrands.insert({ name: trimmedBrand }); // Insere no Firebase
        brands.value.push({ id: addedBrand.id, name: trimmedBrand }); // Atualiza a lista local
        newBrand.value = ''; // Limpa o campo de entrada
        alert('Marca adicionada com sucesso!');
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar a marca.');
    }
};

const deleteBrand = async (id) => {
    if (confirm('Tem certeza de que deseja remover esta marca?')) {
        try {
            await daoBrands.delete(id);
            brands.value = brands.value.filter(brand => brand.id !== id);
            alert('Marca removida com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao remover a marca.');
        }
    }
};

// Navega para a página de atualização da marca
const goToUpdateBrand = (brandId) => {
    router.push({ name: 'updateBrands', params: { id: brandId } });
};
</script>

<template>
    <BaseLayout>
        <div class="content container-fluid mt-5">

            <div class="d-flex align-items-center mb-4">
                <input v-model="newBrand" type="text" class="form-control form-control-sm w-auto" placeholder="Nova marca"/>
                <CustomButton class="btn btn-sm" @click="addBrand">Adicionar</CustomButton>
            </div>

            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="brand in brands" :key="brand.id">
                        <td>{{ brand.name }}</td>
                        <td>
                            <CustomButton @click="deleteBrand(brand.id)" type="button" class="btn btn-danger ms-2 me-2">
                                <i class="bi bi-trash-fill"></i>
                            </CustomButton>
                            <CustomButton @click="goToUpdateBrand(brand.id)" type="button" class="btn btn-danger ms-2 me-2">
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
