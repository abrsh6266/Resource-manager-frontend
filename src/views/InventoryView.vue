<template>
  <Navbar />
    <div>
      <div v-if="loading" class="loading-spinner"></div>
      <div v-else-if="error&&onError"></div>
      <div v-else-if="result && result.Material">
        <Button
        @click="onBackHome"
        text="Back" 
        color="Black" 
        v-show="showMaterials"/>      
        <Button
        @click="onAddCategory"
        text="Add Categories"
        color="Black"
        v-show="showMaterials"/>
        <Button
        @click="onAddMaterial(result.Category)"
        text="Add inventories" 
        color="Black" 
        v-show="showMaterials"/>
        <InsertMaterialForm :categories="result.Category" v-show="addMaterialFormShow" />
        <InsertCategoryForm v-show="addCategoryFormShow" />
        <UpdateMaterialForm :inventory="inventory" :categories="result.Category" v-show="updateMaterialFormShow" />
        <table v-show="showMaterials">
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>serial Number</th>
              <th>Model</th>
              <th>Type</th>
              <th>Processor</th>
              <th>Disk type</th>
              <th>Network Type</th>
              <th>Scan type</th>
              <th>Owner</th>
              <th>quantity</th>
              <th>Taken</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inventory in result.Material" :key="inventory.Id">
              <td>
                <i @click="deleteInventory(inventory.Id)" class="fa-solid fa-trash-can"></i>
                <i @click="showUpdateForm(inventory)" class="fa-solid fa-pen-to-square"></i>                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </td>              
              <td>{{ inventory.name }}</td>
              <td>{{ inventory.serialNumber }}</td>
              <td>{{ inventory.model }}</td>
              <td>{{ inventory.type }}</td>
              <td>{{ inventory.processor }}</td>
              <td>{{ inventory.diskType }}</td>
              <td>{{ inventory.networkType }}</td>
              <td>{{ inventory.scanType }}</td>
              <td>{{ inventory.owner }}</td>
              <td>{{ inventory.total }}</td>
              <td>{{ inventory.taken }}</td>
              <td>
                <Button @click="seeCustodianMaterial(inventory.MaterialCustodianRels)" color="green" text="Custodians" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-for="relation of relations" :key="relation.id">
          <MaterialCustodian v-show="showMaterialCustodian"  :relation="relation"/>
      </div>
      <Button
          @click="onBackToInventories"
          text="Back" 
          color="black"
          v-show="showMaterialCustodian" />
      <Button
          @click="onBackToInventories"
          text="Back" 
          color="black"
          v-show="updateMaterialFormShow" />
    </div>

  </template>
  <script>
  import Navbar from '../components/Navbar.vue'
  import '@fortawesome/fontawesome-free/css/all.css'
  import InsertMaterialForm from '../components/InsertMaterialForm.vue'
  import InsertCategoryForm from '../components/InsertCategoryForm.vue'
  import UpdateMaterialForm from '../components/UpdateMaterialForm.vue'
  import MaterialCustodian from '../components/MaterialCustodian.vue' 
  import Button from '../components/Button.vue' 
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  const GET_INVENTORIES_QUERY = gql`
    query {
      Material {
        Id
        diskType
        model
        name
        networkType
        owner
        processor
        scanType
        serialNumber
        taken
        total
        type
        MaterialCustodianRels {
          id
          materialsSerialNumber
          userName
          amount
          Custodian {
            department
            email
            id
            name
            phoneNumber
            MaterialCustodianRels {
              amount
              id
              materialsSerialNumber
              userName
            }
          }
        }
      }
      Category {
        id
        name
        total
      }
    }`;
  export default {
    name: 'InventoryView',
    setup() {
      const { result, loading, error } = useQuery(GET_INVENTORIES_QUERY);
      return {
        result,
        loading,
        error,
      }
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
        showMaterialCustodian:false,
        showMaterials:true,
        addMaterialFormShow:false,
        addCategoryFormShow:false,
        updateMaterialFormShow:false,       
        relations:null,
        categories:null,
        inventory: null
      }
    },
    components:{
      Button,
      Navbar,
      MaterialCustodian,
      InsertMaterialForm,
      UpdateMaterialForm,
      InsertCategoryForm,
    },
    methods: {
      deleteInventory(Id){
        const yes = confirm('Do you want to remove this material permanently?')
        if(yes)
        {
          const serializedData = JSON.stringify(Id)
          this.$router.push({ name: 'deletingmaterial', query: { data: serializedData } });
        }
      },
      seeCustodianMaterial(relations){
        this.showMaterials = false;
        this.relations = relations;
        this.showMaterialCustodian = true;
      },
      onBackToInventories(){
        this.updateMaterialFormShow = false;
        this.addMaterialFormShow = false;
        this.addCategoryFormShow = false;
        this.showMaterials = true;
        this.showMaterialCustodian = false;
      },
      showUpdateForm(inventory){
        this.inventory = inventory;
        this.showMaterials = false;
        this.updateMaterialFormShow = true;      },
      onAddMaterial(categories){
        this.showMaterials = false;
        this.addMaterialFormShow = true;
        this.categories = categories;
        console.log(categories)
        this.showMaterialCustodian = true;
      },
      onAddCategory(){
        this.showMaterials = false;
        this.addMaterialFormShow = false;
        this.showMaterialCustodian = true;
        this.addCategoryFormShow = true;
      },
      onBackHome(){
        this.$router.push({ name: 'home'});
      },
    },
  }
  </script>
  
  <style sccoped>
  /* Your table styling here */
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
  i{
    margin:4px;
    font-size: 20px;
  }
  .fa-solid:hover {
  color: red; /* Change this to the desired color */
  }
  table {
    width: 800px;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }
  th, td {
    padding: 15px;
    background-color: rgba(255,255,255,0.2);
    color: #fff;
  }
  th {
    text-align: left;
		background-color: #0e1530;  
  }
  tr:hover {
    background-color: rgba(255,255,255,0.3);
  }
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
  
  </style>
  