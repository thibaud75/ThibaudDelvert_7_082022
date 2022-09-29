<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');
  
  * {
    font-family: 'Lato', sans-serif;
    margin:0;
    padding: 0;
    box-sizing: border-box;
    outline: 2px solid orangered;
  }
  
  #app {
    max-width: 100%;
  }
  
  body {
    background-image: linear-gradient(62deg, #FD2D01 0%, #FFD7D7 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding:32px;
  }
  
  body.social{
    display: block;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .card {
    max-width: 100%;
    width: 540px;
    background:white;
    border-radius: 16px;
    padding:32px;
  }
  
  .card__title {
    text-align:center;
    font-weight: 800;
  }
  
  .card__subtitle {
    text-align: center;
    color:#666;
    font-weight: 500;
  }
  
    .button {
      background: #2196F3;
      color:white;
      border-radius: 8px;
      font-weight: 800;
      font-size: 15px;
      border: none;
      width: 100%;
      padding: 16px;
      transition: .4s background-color;
    }
  
    .card__action {
      color:#2196F3;
      text-decoration: underline;
    }
  
    .card__action:hover {
      cursor:pointer;
    }
  
    .button:hover {
      cursor:pointer;
      background: #1976D2;
    }
  
    .button--disabled {
      background:#cecece;
      color:#ececec
    }
    .button--disabled:hover {
      cursor:not-allowed;
      background:#cecece;
    }
  
  </style>