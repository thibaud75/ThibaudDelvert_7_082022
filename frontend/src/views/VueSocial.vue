<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
        <h1 class="card__title"> Bienvenue sur la page d'accueil {{user.prenom}} ici tu peux lire ou créer des posts !</h1>
    </div>

    <div class="post">

    </div>

    <div class="card">
        <div class="form-row">
            <button @click="post()" class="button">
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
    },
    computed: {
      ...mapState({
        user: 'userInfos',
      })
    },
    methods: {
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      },
      post: function() {
        this.$router.push('/post');
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
        width: 400px;
    }

    .card__info{
        margin-bottom: 2%;
    }


</style>