<template>
  <Navbar />
  <div v-if="isAdmin">
    <h1>SignUp Form</h1>
    <SignUp
    @on-sign-up="OnSignUp"   />
    <div v-if="loading" class="loading-spinner"></div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import SignUp from '../components/SignUp.vue'
export default{
  name: 'SignupView',
  components:{
    SignUp,
    Navbar,
  },
  setup() {
        const { mutate: registerUser, loading, error } = useMutation(gql`
        mutation signUp($name: String!, $email: String!, $password: String!) {
          insert_Manager_one(object:  {name: $name, email: $email, password: $password}) {
            password
            name
            email
          }
        }
      `);
      return {
      registerUser,
      loading,
      error
    };
  },
  computed: {
    isAdmin() {
      console.log(localStorage.getItem('role'))
      return localStorage.getItem('role') === 'admin';
    },
  },
  methods:{
    async OnSignUp(manager) {
      try {
        console.log(manager)
        // Destructure the properties from the manager object
        const { name, email, password } = manager;

        // Call the registerUser mutation function with the user data
        const { data } = await this.registerUser({
          name,
          email,
          password,
        });
        alert('regitered Successfully!')
        console.log('Registered user:', data.insert_Manager_one);
      } catch (error) {
        setTimeout({
          if(data){
            alert('regitered Successfully!')
            console.log('Registered user:', data.insert_Manager_one);
            return
          }
        },3000)
        console.error('Error during registration:', error);
        alert('error occurred!')
      }
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
  margin-left: calc(45%);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  } 
h1{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
