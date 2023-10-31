<template>
  <Navbar />
      <div v-if="loading" class="loading-spinner"></div>
      <div v-else-if="error"></div>
      <ul v-else-if="result && result.Department">
        <div class="home-discription">
          <h2>Welcome!</h2> 
          <p>Explore Departements and their locations.
           Click on details  to discover 
          team members and inventory details.</p>
        </div>
        <li v-for="dep of result.Department" :key="dep.id">
          <Department :department="dep" />
        </li>
      </ul>
</template>
<script>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Department from '../components/Department.vue'
import Navbar from '../components/Navbar.vue'
const GET_DEPARTMENTS_QUERY = gql`
  query {
    Department {
      id
      location
      name
      Custodians {
        department
        email
        id
        name
        phoneNumber
        MaterialCustodianRels {
          id
          materialsSerialNumber
          userName
          amount
        }
      }
    }
  }`;
export default {
  name: 'HomeView',
  setup() {
    const { result, loading, error } = useQuery(GET_DEPARTMENTS_QUERY);
    return {
      result,
      loading,
      error,
    }
    
  },
  data(){
    return {
      userRole:false,
      data:''
    }
  },
  components:{
    Department,
    Navbar
  },
  methods: {
    async onError(){
    alert('something wrong please try again')
    this.$router.push({ name: 'login'});
    return true
  },
    handleBackButtonClick() {
      this.$router.push('/login');
    }
  },
  created() {
    window.addEventListener('popstate', this.handleBackButtonClick);
  },
  destroyed() {
    window.removeEventListener('popstate', this.handleBackButtonClick);
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
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
nav{
  display: flex;
  height: 80px;
  width: 100%;
  background: #1b1b1b;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 100px;
  flex-wrap: wrap;
}
nav .logo{
  color: #fff;
  font-size: 35px;
  font-weight: 600;
  margin-left: -40px;
}
nav ul{
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
nav ul li{
  margin: 0 5px;
}
nav ul li a{
  color: #f2f2f2;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 5px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
nav ul li a.active,
nav ul li a:hover{
  color: #111;
  background: rgb(255, 255, 255);
}
nav .menu-btn i{
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: none;
}
input[type="checkbox"]{
  display: none;
}
.home-discription{
  margin: 10px;
}
@media (max-width: 1000px){
  nav{
    padding: 0 40px 0 50px;
  }
}
@media (max-width: 920px) {
  nav .menu-btn i{
    display: block;
  }
  #click:checked ~ .menu-btn i:before{
    content: "\f00d";
  }
  nav ul{
    position: fixed;
    top: 80px;
    left: -100%;
    background: #111;
    height: 100vh;
    width: 100%;
    text-align: center;
    display: block;
    transition: all 0.3s ease;
  }
  #click:checked ~ ul{
    left: 0;
  }
  nav ul li{
    width: 100%;
    margin: 40px 0;
  }
  nav ul li a{
    width: 100%;
    margin-left: -100%;
    display: block;
    font-size: 20px;
    
  }
  #click:checked ~ ul li a{
    margin-left: 0px;
  }
  nav ul li a.active,
  nav ul li a:hover{
    background: none;
    color: rgb(240, 154, 25);
  }
}
</style>
