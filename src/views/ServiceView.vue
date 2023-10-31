<template>
  <Navbar />
    <div v-if="loading" class="loading-spinner"></div>
    <div v-else-if="error&&onError"></div>
    <div v-else-if="result">
      <div v-show="departmentShow">
        <Departments @on-service-show="onShowServiceButtons" :departments="result.Department" />  
      </div>
      <div v-show="custodianShow">
        <Custodians @on-service-show="onShowServiceButtons" :departments="result.Department" :custodians="result.Custodian"/>  
      </div>
      <div v-show="relationShow">
        <Relations @on-service-show="onShowServiceButtons" :relations="result.materialCustodianRel" :custodians="result.Custodian" :materials="result.Material"/>  
      </div>
      <div class="container" v-show="showServiceButtons">
            <h1>Services</h1>
      <!-- Button to Add Department -->
      <div class="button-container">
        <a @click="onDepartment">
          <span>Department</span>
        </a>
        <p class="button-description">Click this button to add,delete,update a new department.</p>
      </div>

      <!-- Button to Add Custodian -->
      <div class="button-container">
        <a @click="onCustodian">
          <span>Custodian</span>
        </a>
        <p class="button-description">Click this button to add,delete,update custodian.</p>
      </div>

      <!-- Button to Give Inventory -->
      <div class="button-container">
        <a @click="onRelation">
          <span>Inventory</span>
        </a>
        <p class="button-description">Click this button to assign inventory to a custodian.</p>
      </div>
      <Button
        @click="onBackHome"
        text="Back to Home" 
        color="Black" />
    </div>
    </div>
</template>
<script>
  import Navbar from '../components/Navbar.vue'
  import Relations from '../components/Relations.vue'
  import Departments from '../components/Departments.vue'
  import Custodians from '../components/Custodians.vue'
  import '@fortawesome/fontawesome-free/css/all.css'
  import Button from '../components/Button.vue' 
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  const GET_SERVICES_QUERY = gql`
    query {
    materialCustodianRel {
        amount
        id
        materialsSerialNumber
        userName
    },
    Material {
        Id
        name
        taken
        total
        networkType
        owner
        processor
        scanType
        serialNumber
        type
        diskType
        model
    },
    Department {
        id
        location
        name
    },
    Custodian {
        email
        id
        name
        phoneNumber
        department
        }
    }`;
export default {
    name: 'ServiceView',
    setup() {
      const { result, loading, error } = useQuery(GET_SERVICES_QUERY);
      return {
        result,
        loading,
        error,
      }
      
    },
    components:{
        Button,
        Departments,
        Custodians,
        Relations,
        Navbar,
    },
    computed:{
        onError(){
        alert('something wrong please try again')
        this.$router.push({ name: 'login'});
        return true
      }
    },
    data(){
      return {
        showServiceButtons:true,
        departmentShow:false,
        custodianShow:false,
        relationShow: false,
      }
    },
    methods:{
      onDepartment(){
        this.showServiceButtons=false;
        this.custodianShow = false;
        this.relationShow = false;
        this.departmentShow=true;
      },
      onCustodian(){
        this.showServiceButtons=false;
        this.departmentShow=false;
        this.relationShow = false;
        this.custodianShow = true;
      },
      onRelation(){
        this.showServiceButtons=false;
        this.departmentShow=false;
        this.custodianShow = false;
        this.relationShow = true;
      },
      onShowServiceButtons(){
        this.showServiceButtons=true;
        this.departmentShow=false;
        this.custodianShow=false;
        this.relationShow = false;
      },
      onBackHome(){
        this.$router.push({ name: 'home'});
      }
    }
}
</script>
<style scoped>
.button-description {
  font-size: 20px;
  height: 100px;
  color: #262323;
  margin-top: 20px;
}

.container {
  text-align: center;
  max-width: 500px;
  margin: 20px auto;
  padding: 30px;
  border: 1px solid steelblue;
  border-radius: 5px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
}

a {
  display: block;
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: sans-serif;
  text-decoration: none;
  color: #0a0202;
  border: 2px solid #333;
  letter-spacing: 2px;
  text-align: center;
  position: relative;
  transition: all .35s;
  margin: 10px;
}

a span {
  position: relative;
  z-index: 2;
}

a:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #ff003b;
  transition: all .35s;
}

a:hover {
  color: #fff;
}

a:hover:after {
  width: 100%;
}

/* Responsive styles for mobile devices */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
    margin-top: 10%;
    padding: 20px;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .button-container {
    margin-top: 15px;
  }

  a {
    width: 100%;
  }
}
</style>