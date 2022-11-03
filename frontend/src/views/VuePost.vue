<template>

    <div class ="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania" class="logo__img">
    </div>

    <div class="card" v-if="singlePost">

      <ul class="ul--post">
        <li>
            <h2> {{singlePost.title}} par {{singlePost.auteur}}</h2>
            <p>{{singlePost.description}}</p>
            <img v-bind:src="singlePost.imageUrl" v-bind:alt="singlePost.title" class="img--post">
            
            <div>

                <div v-if ="singlePost.usersLiked.includes(userInfos.userId)" class="div--like">

                  <div class="div--icon">
                    <font-awesome-icon @click="unlikePost()" icon="fas-regular fa-heart" class="icon--unlike"/>
                    <span>{{singlePost.likes}}</span>
                  </div>
                </div>

                <div v-else class="div--like">

                  <div class="div--icon">
                    <font-awesome-icon @click="likePost()" icon="fas-regular fa-heart" class="icon--like"/>
                    <span>{{singlePost.likes}}</span>
                  </div>
                </div>

            </div>

            <div v-if= "user.role == 'admin' || userInfos.userId === singlePost.userId">
              <!-- <p>{{singlePost.usersLiked.includes(userInfos.userId)}}</p>
              <p>{{userInfos.userId}}</p>
              <p>{{user.role}}</p> -->
              <button @click="modifyPost(singlePost._id)" class="button">Modifier post</button>
              <button @click="deletePost(singlePost._id)" class="button">Supprimer le post</button>
            </div>
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
        userInfos: 'user',
      })
    },
    methods: {
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
      },
      deletePost: function(id) {
        
        axios.delete("http://localhost:3000/api/post/" + id, {headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },})
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
            .then(location.reload())
      
        },
        unlikePost: function() {
        this.$store.dispatch('likePost', [
        
             this.id,    
            {
              userId: JSON.parse(localStorage.getItem("user")).userId,
              like: 0,

            }])
            .then(location.reload())
      
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
        width: 300px;
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
      margin: 2% 0;
    }

    .div--icon{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .div--icon span{
      margin-left: 2%;
      font-size: 20px;
    }

    .icon--like:hover{
      color: #0dcaf0;
    }

    .icon--like{
      color: white;
    }

    .icon--unlike{
      color: #0dcaf0;;
    }

    .ul--post{
      border: 4px solid #4E5166;
      background-color: #FFD7D7;
    }

    .img--post{
      max-width: 100%;
      padding: 2%;
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
    
</style>