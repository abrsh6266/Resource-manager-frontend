<template>
  <body>
    <router-view></router-view>
  </body>
  <Footer />
</template>
<script>
import Footer from './components/Footer.vue'
export default {
  name:'App',
  components:{
    Footer,
  },
  }
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,500,300,700);
body{
   background: url(./img/background.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
* {
  font-family: Open Sans;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: block;
  background: #000;
  color: #fff;
  border: none;
  padding: 4px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 80px;
}
</style>