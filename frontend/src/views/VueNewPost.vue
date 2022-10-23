<template>
        <div class="card">
            <div class="form-row">
              <form method="post">
                <label for="title">Titre</label>
                <input type="text"  id="title" v-model ="title">

                <label for="description">Description en rapide</label>
                <input type="text"  id="description" v-model ="description">

                <input type="file" accept="image/*" @change=onFileChange >

                <button @click="createPost()" class="button">
                  Publier mon post    
                </button>
              </form>
            </div>
          </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
    name: 'VueNewPost',
    methods: {
        createPost: function () {
          this.$store.dispatch('createPost', {
            post: {
              userId: JSON.parse(localStorage.getItem("user")).userId,
              description: this.description,
              title: this.title,
            },
            image: this.image,

          }).then( () => {
            this.$router.push('/social');
          }, function (error) {
            console.log(error);
          })
        },
        onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
        return;
        this.createImage(files[0]);
      },
      createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

// onFileAdded(event)
// {
//     var file = event.target.files[0];
//     this.sauceForm.get('image').setValue(file);
//     this.sauceForm.updateValueAndValidity();
//     var reader_1 = new FileReader();
//     reader_1.onload = function () {
//         this.imagePreview = reader_1.result;
//     };
//     reader_1.readAsDataURL(file);
// }

  }
}

</script>

<style scoped>

</style>