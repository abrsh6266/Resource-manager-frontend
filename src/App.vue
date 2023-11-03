<template>
  <body>
    <router-view></router-view>
    <Footer />
  </body>
</template>
<script>
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,500,300,700);
* {
  font-family: Open Sans;
}
body{
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
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