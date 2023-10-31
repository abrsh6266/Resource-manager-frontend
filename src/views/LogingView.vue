<template>
  <div v-if="loading" class="loading-spinner"></div>
  <div v-else-if="error&&onError">
  </div>
  <div v-else-if="result&&isResultFound" >
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default {
  name: 'LogingView',
  setup() {
    try{
      const route = useRoute();
      const dataParam = route.query.data;
      const manager = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
      console.log(manager)
      const { result, loading, error } = useQuery(
        gql`
          query getManager($email: String!, $password: String!, $role: String!) {
            Manager(where: { email: { _eq: $email }, password: { _eq: $password }, role: { _eq: $role } }) {
              name
              email
              password
              role
              token
            }
          }
        `,
        {
        email: manager.email,
        password: manager.password,
        role: manager.role,
      }
      )
      return {
        result,
        loading,
        error,
      }
    }catch(error){
      alert('something wrong please try again')
    }
  },
  computed:{
    async isResultFound() {
      localStorage.setItem('Authorization', this.result.Manager[0].token);
      localStorage.setItem('role', this.result.Manager[0].role);
      this.$router.push({ name: 'home'});
      return true
  },
  async onError(){
    alert('something wrong please try again')
    this.$router.push({ name: 'login'});
    return true
  }
}
}
</script>
<style scoped>
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-top: calc(20%);
  margin-left: calc(45%);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  } 
</style>
