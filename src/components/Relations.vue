<template>
      <div class="form-container">
        <form >
            <h1>Give Inventory</h1>
            <div class="info">
              <label for="custodian">Custodian Name:</label>
              <select id="custodian" v-model="formData.userName" required>
                <option v-for="custodian in custodians" :key="custodian.id"  :value="custodian.name">{{ custodian.name }}</option>
              </select>
              <label for="material">Material SeialNo:</label>
              <select :disabled="(formData.userName==='')" @change="onSelectMaterial" id="material" v-model="material" required>
                <option v-for="material in materials" :key="material.id"  :value="material">{{ material.serialNumber }}</option>
              </select>
              <label for="inventoryCount">Amount:</label>
              <input
              id="inventoryCount"
              type="number"
              :disabled="!enableTake"
              v-model="formData.amount"
              :min="0"
              :max="maxInventory"
              />
            </div>
            <button :disabled="!enableTake" @click="onTakeMaterial" type="submit" ><i class="fa-solid fa-user-plus"> Take</i></button>
        </form>
        <form >
            <h1><i v-show="returnEnabled" class="fa-regular fa-circle-check"></i>Return Inventory</h1>
            <div class="info">
              <label for="inventoryCount">ID : {{ updateFormData.id }}</label><br>
              <label for="inventoryCount">Return Amount:</label>
              <input
              id="inventoryCount"
              type="number"
              :disabled="!returnEnabled"
              v-model="returnedAmount"
              :min="0"
              :max="maxUpdateInventory"
              />
            </div>
            <button :disabled="!returnEnabled" @click="onReturnMaterial" type="submit" ><i class="fa-solid fa-user-minus"> return</i></button>
        </form>
      </div>
    <div>
      <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>ID</th>
              <th>User Name</th>
              <th>Material SerialNo</th>
              <th>amount</th>
            </tr>
          </thead>
        <tbody>
            <tr v-for="relation in relations" :key="relation.id">
              <td>
                <i @click="onDeleteRelation(relation)" class="fa-solid fa-trash-can"></i>
                <i @click="showReturnForm(relation)" class="fa-solid fa-pen-to-square"></i>                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </td>
              <td>{{ relation.id }}</td>
              <td>{{ relation.userName }}</td>
              <td>{{ relation.materialsSerialNumber }}</td>
              <td>{{ relation.amount }}</td>
            </tr>
        </tbody>
      </table>
    </div>
      <Button
        @click="$emit('on-service-show')"
        text="Back"
        color="black" />

  </template>
  <script>
  import '@fortawesome/fontawesome-free/css/all.css'
  import Button from './Button.vue' 
  export default {
    name: 'Departments',
    setup() {
    },
    props:{
        relations:Object,
        custodians:Object,
        materials:Object,
    },
    data(){
      return {
        formData:{
            id:0,
            userName:'',
            amount:0,
            takenMaterial:0,
            materialsSerialNumber:''
        },
        updateFormData:{
            id:0,
            userName:'',
            amount:0,
            takenMaterial:0,
            materialsSerialNumber:''
        },
        maxInventory:0,
        maxUpdateInventory:0,
        returnedAmount:0,
        material:null,
        relation:null,
        formEnabled:false,
        enableTake:false,
        returnEnabled:false
      }
    },
    components:{
      Button,
    },
    methods: {
        onSelectMaterial(){
          this.formData.materialsSerialNumber = this.material.serialNumber;
          this.maxInventory=this.material.total-this.material.taken;
          if(this.maxInventory>0){
            this.enableTake=true;
          }else{
            this.enableTake=false;
          }
        },
        onDeleteRelation(relation){
        const yes = confirm('Do you want to remove this Custodian permanently?')
        if(yes)
        {
          const material = this.materials.find(mat => mat.serialNumber === relation.materialsSerialNumber);
          this.formData.id = relation.id
          this.formData.takenMaterial = material.taken-relation.amount
          this.formData.materialsSerialNumber = relation.materialsSerialNumber
          const serializedData = JSON.stringify(this.formData)
          this.$router.push({ name: 'deletingrelation', query: { data: serializedData } });
        }
      },
      onReturnMaterial(e){
        e.preventDefault()
        this.updateFormData.amount = this.relation.amount-this.returnedAmount;
        const material = this.materials.find(mat => mat.serialNumber === this.updateFormData.materialsSerialNumber);
        if (material) {
          console.log('Found material:', material);
          this.updateFormData.takenMaterial = material.taken - this.returnedAmount;
          const serializedData = JSON.stringify(this.updateFormData)
          this.$router.push({ name: 'updatingrelation', query: { data: serializedData } });
        }
        else {
          console.log('Material not found');
        }
      },
      onTakeMaterial(e){
        e.preventDefault();
        const relation = this.relations.find(rel => 
            rel.materialsSerialNumber === this.formData.materialsSerialNumber &&
            rel.userName === this.formData.userName
          );
          if (relation) {
            console.log('Found relation:', relation);
            this.updateFormData.id = this.formData.id;
            this.updateFormData.takenMaterial = this.formData.amount+this.material.taken;
            this.updateFormData.materialsSerialNumber = relation.materialsSerialNumber;
            this.updateFormData.amount = this.formData.amount+relation.amount;
            this.updateFormData.userName = this.formData.userName;
            console.log('Form Update data :',this.updateFormData)
            const serializedData = JSON.stringify(this.updateFormData)
            this.$router.push({ name: 'updatingrelation', query: { data: serializedData } });
          } else {
            this.formData.takenMaterial = this.formData.amount+this.material.taken;
            console.log('Relation not found');
            console.log('Form data :',this.formData)
            const serializedData = JSON.stringify(this.formData)
            this.$router.push({ name: 'addingrelation', query: { data: serializedData } });
          }
        },
        showReturnForm(relation){
          this.relation = relation
          this.updateFormData.id = relation.id;
          this.updateFormData.userName = relation.userName;
          this.updateFormData.materialsSerialNumber = relation.materialsSerialNumber;
          this.maxUpdateInventory = relation.amount
          this.returnEnabled = true;
        },
        // onDeleteRelation(e){
        //     e.preventDefault();
        //     // const serializedData = JSON.stringify(this.formData)
        //     // this.$router.push({ name: 'updatingcustodian', query: { data: serializedData } });
        // },
    },
  }
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

/* Common styles for both mobile and larger screens */
i {
  margin: 4px;
  font-size: 20px;
}

.fa-solid:hover {
  color: red; /* Change this to the desired color */
}
.fa-circle-check{
  color: rgb(0, 255, 0);
  font-size: 30px;
}
table {
  margin-left: calc(5%);
  display:inline;
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
th {
  text-align: left;
  background-color: #0e1530;
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

h1 {
  margin-left:calc(20%);
  font-weight: 400;
  color: #020405;
}

form {
  padding: 25px;
  margin: 25px;
  box-shadow: 0 2px 5px #f5f5f5;
  background-color: rgba(47, 47, 63, 0.5);

}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #1c87c9;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #1c87c9;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
}

button:hover {
  background: #2371a0;
}
.form-container {
  background-color: transparent;
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}
form {
  flex: 1; 
  margin: 10px;
}
@media (min-width: 568px) {
  table {
    width: 800px;
  }
  .main-block {
    flex-direction: row;
  }
  .left-part, form {
    width: 30%;
  }
}
  </style>
  