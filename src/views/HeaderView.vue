<template>
  <div class="container">
    <header>
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <h3 class="animate-charcter">ACSO Information Technology Inventory Management System</h3>
            </div>
          </div>
        </div>
      <router-link to="/login">
        <Button @click="onSignIn" text="Get Started" class="x" color="black" />
      </router-link>
    </header>
  </div>
</template>
<script>
import Button from "../components/Button.vue";
export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {
    Button,
  },
  methods: {
    onSignIn() {
      this.$emit("sign-in");
    },
    onSignUp() {
      this.$emit("sign-up");
    },
  },
  data() {
    return {
      role: "",
    };
  },
};
</script>
<style scoped>
.x {
  margin-top: calc(15%);
  margin-left: calc(35%);
}
.y {
  margin-left: calc(40%);
}
.animate-charcter
{
   text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
      font-size: 20px;
      text-align:center;    
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
</style>





