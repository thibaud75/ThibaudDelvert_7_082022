<template>
    <div class="card">
        <div class="form-row">
          <form method="post">
            <label for="title">Titre</label>
            <input type="text"  id="title" v-model ="title">

            <label for="description">Description en rapide</label>
            <input type="text"  id="description" v-model ="description">

            <button @click="editPost()" class="button">
              Publier mon post    
            </button>
          </form>
        </div>
      </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
name: 'VueEdit',
props: ["id"],
// mounted: function () {
//       this.$store.dispatch('getUserInfos');
//       this.$store.dispatch('getAllPosts');
//       this.$store.dispatch("getPostInfos", this.id);
//     },
computed: {
      ...mapState({
        user: 'userInfos',
        post: 'postInfos',
        singlePost: 'getOnePost',
      })
    },
methods: {
editPost: function() {
    this.$store.dispatch('modifyPost', [
        
             this.id,    
            {
              userId: JSON.parse(localStorage.getItem("user")).userId,
              description: this.description,
              title: this.title,

            }])
        
          .then(this.$router.push("/social"))
        } 
    }
}

</script>

<style scoped>

</style>