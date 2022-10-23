<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
        <h1 class="card__title"> Bienvenue sur la page d'accueil {{user.prenom}} ici tu peux lire ou créer des posts !</h1>
    </div>

    <div class="card" v-if="singlePost">

      <ul>
        <li>
            <h2> {{singlePost.title}} par {{user.prenom}}</h2>
            <p>{{singlePost.description}}</p>
            <div class="div--like">
              <font-awesome-icon @click="likePost()" icon="fas-regular fa-heart"/>
              <span></span>
            </div>
            <button @click="modifyPost(singlePost._id)" class="button">Modifier post</button>
            <button @click="deletePost(singlePost._id)" class="button">Supprimer le post</button>
        </li>
      </ul>



    </div>
</template>

<script>

  import axios from 'axios';
  import { mapState } from 'vuex'

  export default {
    name:   'VuePost',
    props: ["id"],

    mounted: function () {
      this.$store.dispatch('getUserInfos');
      this.$store.dispatch('getAllPosts');
      this.$store.dispatch("getPostInfos", this.id);
    },
    computed: {
      post() {
          return this.$store.state.getOnePost;
      },
      ...mapState({
        user: 'userInfos',
        post: 'postInfos',
        singlePost: 'getOnePost',
      })
    },
    methods: {
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      },
      deletePost: function(id) {
        
        axios.delete("http://localhost:3000/api/post/" + id)
        .then(this.$router.push("/social"))
       
      },
      modifyPost: function(id){
        this.$router.push('/edit/' + id)
      },
      likePost: function() {
        this.$store.dispatch('likePost', [
        
             this.id,    
            {
              userId: JSON.parse(localStorage.getItem("user")).userId,
              like: 1,

            }])
      
        } 
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

    .fa-heart{
      color: #f7f7f7;
      font-size: 300%;
      cursor: pointer;
    }

    .button--like{
      border: none;
      background: none;
    }

    .div--like{
      text-align: center;   
    }
    
</style>