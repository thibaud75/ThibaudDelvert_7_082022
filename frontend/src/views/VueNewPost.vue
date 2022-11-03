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

              <div class="form-row" v-if="status == 'error_post'">
                  Il manque des infos
              </div>

              <input type="file" id="file" class="button" ref="file" v-on:change="onFileChange"/>

              <button type="submit" class="button" @click="createPost()" :class="{'button--disabled' : !validatedFields}">Publier mon post</button>

           </form>
          </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'VueNewPost',
    data: function () {
        return {
          title: '',
          description: '',
          auteur: '',
        }
      },
    computed: {
      validatedFields: function () {

      if (this.title != "" && this.description != "" && this.auteur != "") {
        return true;
      } else {
        return false;
        }
      
       },
       ...mapState(['status'])
    },
    methods: {
        createPost: function () {
 
          var form = document.getElementById('form');
          var formData = new FormData(form);
          const timestamp = Date.now();
          console.log(timestamp);

          formData.append('post', JSON.stringify(
            {
              userId: JSON.parse(localStorage.getItem("user")).userId,
              title: this.title, 
              description: this.description,
              auteur: this.auteur,
              timestamp,
            }))


          formData.append('image', this.file)

          this.$store.dispatch('createPost', formData)
          .then(() => {
            this.$router.push('/social');
          }, function (error) {
            console.log(error);
          })
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