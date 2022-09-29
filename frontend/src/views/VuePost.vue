<template>
        <div class="card">
        <div class="form-row">
            <button @click="createPost()" class="button">
                Publier mon post    
            </button>
        </div>
        </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
    name: 'VuePost',
    methods: {
        createPost: function () {
          const self = this;
          this.$store.dispatch('createPost', {
            description: this.description,
            image: this.image,
          }).then(function () {
            self.switchToLogin();
          }, function (error) {
            console.log(error);
          })
        },
    }
}

</script>

<style scoped>

</style>