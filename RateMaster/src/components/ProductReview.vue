<template>
    <div class="product-review">
        <div class="product-image">
            <img src="../../assets/product-image.png" alt="" />
        </div>
        <div class="product-info">
            <h2>Product Name</h2>
            <p>Here is where is gonna be the description of the product. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and 
                scrambled it to make a type specimen book.</p>
            <div class="rating">
                <span class="star">★</span> 4,5/5
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.product-review{
    display: flex;
    background-color: #999999;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px rgba(0, 0, 0, 0.1);
    margin-left: auto;
    margin-right: auto;
    max-width: 150vh;
}
.star{
    color: #EAB308;
}
.product-image{
    margin-right: 2vh;
}
img{
    border-radius: 50%;
}
</style>