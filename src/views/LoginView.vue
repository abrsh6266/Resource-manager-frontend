<template>
  <div class="container">
    <h1>Login</h1>
  <SignIn
  @on-back="onBack"
  @validate-signin="validateSignin"   />
  </div>
</template>
<script>
import SignIn from '../components/SignIn.vue'
export default{
  name: 'LoginView',
  components:{
    SignIn,
  },
  methods:{
    async validateSignin(manager) {
      const serializedData = JSON.stringify(manager)
      this.$router.push({ name: 'loging', query: { data: serializedData } });
      return true;
  }
}
}
</script>
<style scoped>
h1{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
