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
    outline: 2px solid rgb(11, 23, 189);
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
    /* max-width: 100%;
    border-radius: 8px; */
  }
  
  .logo{
      margin-bottom: 5%;
  }

    .logo__img{
      width: 100%;
      height: 100px;
      object-fit: cover;
      object-position: center;
  }

  .card {
    max-width: 100%;
    width: 540px;
    background:white;
    border-radius: 16px;
    padding:32px;
  }

  .card--auth{
    border: 6px solid #FFD7D7;
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
      font-weight: 800;
      font-size: 15px;
      border: 4px solid black;
      margin-top: 1%;
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
    
    h2{
      text-align: center;
    }
    
    p{
      text-align: center;
      margin: 2% 0;
    }

    ul {
      list-style-type: none;
    }

    .form-row{
      margin-top: 2%;
    }

    a{
      text-decoration: none;
      color: black;
    }

  </style>