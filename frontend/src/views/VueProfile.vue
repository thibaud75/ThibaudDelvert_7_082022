<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
    </div>

    <div class="card card--auth">
      <h1 class="card__title">Bienvenue</h1>
      <p class="card__info">{{user.prenom}}</p> 
      <p class="card__info">{{user.nom}} </p> 
      <div class="form-row">
        <button @click="social()" class="button">
          Continuer vers l'accueil
        </button>
      </div>
      <div class="form-row">
        <button @click="logout()" class="button">
          Déconnexion
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'

  export default {
    name: 'VueProfile',
    mounted: function () {
      // console.log(this.$store.state.user);
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
      social: function(){
        this.$router.push('/social');
      }
    },
    beforeCreate: function() {
        document.body.className = 'profile';
    }
  }
  </script>
  
  <style scoped>
    
    .card__info{
      margin-bottom: 2%;
      border: 2px solid #4E5166;
    }


  </style>>
  