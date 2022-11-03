<template>
  
      <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
    </div>

    <div class="card">

        <form id="form">

          <label for="title">Titre</label>
              <input type="text" id="title" v-model="title">

              <label for="auteur">Auteur</label>
              <input type="text" id="auteur" v-model="auteur">


              <label for="description">Description</label>
              <textarea id="description" class="form--textarea" rows="5" v-model="description"></textarea>

            <input type="file" id="file" class="button" ref="file" v-on:change="onFileChange"/>
 
            <button type="submit" class="button" @click="editPost()" :class="{'button--disabled' : !validatedFields}">Publier mon post</button>


        </form>   
      </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
name: 'VueEdit',
data: function () {
        return {
          title: '',
          description: '',
          auteur: '',
        }
      },
props: ["id"],
computed: {
  validatedFields: function () {

      if (this.title != "" && this.description != "" && this.auteur != "") {
        return true;
      } else {
        return false;
        }

      },
      ...mapState({
        user: 'userInfos',
        post: 'postInfos',
        singlePost: 'getOnePost',
      })
    },
methods: {
editPost: function() {

            var form = document.getElementById('form');
            var formData = new FormData(form);
            formData.append('post', JSON.stringify(
            {
              userId: JSON.parse(localStorage.getItem("user")).userId,
              title: this.title, 
              description: this.description,
              auteur: this.auteur,
            }))


          formData.append('image', this.file)

    this.$store.dispatch('modifyPost', [ 

        this.id,
        formData,
            ])
        
          .then(this.$router.push("/social"))
        },
        
        onFileChange(e) {
            console.log(e);
        this.file = e.target.files[0];
        },
    },

    beforeCreate: function() {
      document.body.className = '';
  }
}

</script>

<style scoped>

.card{
    border: 6px solid #FFD7D7;
}

#form{
  display: flex;
  flex-direction: column;
}

#form input{
  margin-top: 1%;
}

input::file-selector-button {
  display: none;
}
.form--textarea{
  height: 100px;
  margin-top: 1%;
}

</style>