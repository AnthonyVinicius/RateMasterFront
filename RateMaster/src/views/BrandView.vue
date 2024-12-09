<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { ref, onMounted } from 'vue';

const daoBrands = new DAOService('brands');

const brands = ref([]);
const newBrand = ref('');

onMounted(() => {
    showAllBrands();
});

const showAllBrands = async () => {
    brands.value = await daoBrands.getAll();
};

const addBrand = async () => {
    const trimmedBrand = newBrand.value.trim();
    if (!trimmedBrand) {
        alert('Por favor, insira um nome válido para a marca.');
        return;
    }

    try {
        const addedBrand = await daoBrands.insert({ name: trimmedBrand });
        brands.value.push({ id: addedBrand.id, name: trimmedBrand });
        newBrand.value = '';
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
</script>

<template>
    <BaseLayout>
        <div class="content container-fluid mt-5">
            <div class="d-flex align-items-center mb-4">
                <input v-model="newBrand" type="text" class="form-control form-control-sm w-auto" placeholder="Nova marca" />
                <CustomButton class="btn btn-sm ms-2" @click="addBrand">Adicionar</CustomButton>
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </BaseLayout>
</template>

<style scoped>
.table {
    margin-top: 20px;
}
</style>
