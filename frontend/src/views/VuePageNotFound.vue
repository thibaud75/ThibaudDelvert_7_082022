<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
    </div>

    <h2>404 Page</h2>
</template>

<script>

export default{
    name: 'VuePageNotFound',

    beforeCreate: function() {
        document.body.className = 'social';
    }
}

</script>

<style scoped>

.logo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }

    .logo__img{
        width: 40%;
        height: 130px;
        object-fit: cover;
        object-position: center;
        margin-bottom: 2%;
    }
    
   
h2{
    font-size: 40px;
}
</style>