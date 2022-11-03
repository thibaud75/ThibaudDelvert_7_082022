<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
        <h1 class="card__title"> Bienvenue sur la page d'accueil {{user.prenom}} ici tu peux lire ou créer des posts !</h1>
    </div>

    <div class="card">

      <ul class="ul--social">
        
        <!-- <li class="li-social" v-for="onePost in post.sort((a, b) => (b.timestamp > a.timestamp) ? 1 : -1)"> -->
        <li class="li--social" v-for="onePost in post">
          <router-link :to="`/post/${onePost._id}`">

            <div class="div--social">
                <h2>{{onePost.title}} par {{onePost.auteur}}</h2>
                <img v-bind:src="onePost.imageUrl" v-bind:alt="onePost.title" class="img--social">
            </div>
            
          </router-link>
        </li>
      </ul>


        <div class="form-row">
            <button @click="goToPost()" class="button">
                Créer un post    
            </button>
        </div>


    </div>
<!-- 
    <div class="card">
      <p class="card__info">{{user.prenom}}</p> 
      <p class="card__info">{{user.nom}} </p> 
      <div class="form-row">
        <button @click="logout()" class="button">
            Déconnexion
        </button>
      </div>
    </div> -->

</template>

<script>

  import axios from 'axios';
  import { mapState } from 'vuex'

  export default {
    name:   'VueSocial',
    mounted: function () {
      this.$store.dispatch('getUserInfos');
      this.$store.dispatch('getAllPosts');
      // this.$store.dispatch('getPostInfos');
    },
    computed: {
      ...mapState({
        user: 'userInfos',
        post: 'postInfos',
        yo: 'getOnePost',
        auth: 'user',
      }),  
    },
    methods: {
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      },
      goToPost: function() {
        this.$router.push('/newpost');
      },
      deletePost: function(id) {
        
        axios.delete("http://localhost:3000/api/post/" + id)
        .then(location.reload())
       
      },
      modifyPost: function(id){
        this.$router.push('/post?id=' + id)
      },
      getOnePost: function(id) {
        axios.get("http://localhost:3000/api/post/" + id, {headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },})
        
        .then(this.$router.push("/post/" + id))
        .then((response) => {
          console.log(response.data);
          return response;
        })
      },
  }, 
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
        width: 300px;
        height: 130px;
        object-fit: cover;
        object-position: center;
        margin-bottom: 2%;
    }

    .card{
        width: unset;
        display: flex;
        border: 4px solid black;
        align-items: center;
        flex-direction: column;
        background-image: linear-gradient(62deg, #FD2D01 0%, #FFD7D7 100%);
    }

    .card__info{
        margin-bottom: 2%;
    }


    .img--social{
      max-width: 100%;
      max-height: 100%;
      background-size: 150px;
      padding: 2%;

    }

    .ul--social{
      display: flex;
      flex-wrap: wrap;
    }
    .li--social{
      border: 2px solid #4E5166;
      margin: 1%;
      width: 18%;
      background-color: #FFD7D7;
      transition: all 0.1s ease-in-out;
      overflow: scroll;

    }

    h2{
      margin-bottom: 5%;
    }

    @media (max-width: 768px) {
      .li--social{
        width: unset;
        margin-bottom: 5%;
      }
}
</style>