<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
        <h1 class="card__title"> Bienvenue sur la page d'accueil {{user.prenom}} ici tu peux lire ou créer des posts !</h1>
    </div>

    <div class="card">

      <ul>
        <li v-for="onePost in post">
          <router-link :to="`/post/${onePost._id}`" @click.native="getOnePost(onePost._id)">
            <h2>{{onePost.title}} par {{user.prenom}}</h2>
            <p>{{onePost.description}}</p>
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
      console.log(this.$store.state.user);
      if (this.$store.state.user.userId == -1) {
        this.$router.push('/');
        return ;
      }
      this.$store.dispatch('getUserInfos');
      this.$store.dispatch('getAllPosts');
      // this.$store.dispatch('getPostInfos');
    },
    computed: {
      ...mapState({
        user: 'userInfos',
        post: 'postInfos',
        yo: 'getOnePost',
      })
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
        axios.get("http://localhost:3000/api/post/" + id)
        
        .then(this.$router.push("/post/" + id))
        .then((response) => {
          console.log(response.data);
          return response;
        })
      },
      // modifyPost: function(id){
      //   axios.put("http://localhost:3000/api/post/" + id)
      //   .then(this.$router.push('/post?id=' + id))
      // },
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
        width: 40%;
        height: 130px;
        object-fit: cover;
        object-position: center;
        margin-bottom: 2%;
    }

    .card{
        width: unset;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-image: linear-gradient(62deg, #FD2D01 0%, #FFD7D7 100%);
    }

    .card__info{
        margin-bottom: 2%;
    }


</style>