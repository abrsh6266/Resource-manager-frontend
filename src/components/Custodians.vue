<template>
    <div class="form-container">
        <form >
            <h1>----Add--- Custodian</h1>
            <div class="info">
              <input v-model="formData.name" class="fname" type="text" name="name" placeholder="Name" required>
              <select placeholder="department" id="department" v-model="formData.department" required>
                <option v-for="department in departments" :key="department.id"  :value="department.name">{{ department.name }}</option>
              </select>
              <input v-model="formData.phoneNumber" class="fname" type="text" name="name" placeholder="phone number" required>
              <input v-model="formData.email" type="email" name="location" placeholder="email" required>
            </div>
            <button @click="onInsertCustodian" type="submit" >Insert</button>
        </form>
        <form >
            <h1>--Update-- Custodian</h1>
            <div class="info">
                <input v-model="formData.id" type="text" name="id" placeholder="id" :disabled="!formEnabled" required>
                <input v-model="formData.name" class="fname" type="text" name="name" placeholder="Name" :disabled="!formEnabled" required>
              <select :disabled="!formEnabled" placeholder="department" id="department" v-model="formData.department" required>
                <option v-for="department in departments" :key="department.id"  :value="department.name">{{ department.name }}</option>
              </select>
              <input :disabled="!formEnabled" v-model="formData.phoneNumber" class="fname" type="text" name="name" placeholder="phone number" required>
              <input :disabled="!formEnabled" v-model="formData.email" type="email" name="email" placeholder="email" required>
            </div>
            <button @click="onUpdateCustodian" type="submit" :disabled="!formEnabled" >Update</button>
        </form>
    </div>
    <div>
    <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>PhoneNumber</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="custodian in custodians" :key="custodian.id">
              <td>
                <i @click="onDeleteCustodian(custodian.id)" class="fa-solid fa-trash-can"></i>
                <i @click="showUpdateForm(custodian)" class="fa-solid fa-pen-to-square"></i>                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </td>
              <td>{{ custodian.id }}</td>
              <td>{{ custodian.name }}</td>
              <td>{{ custodian.department }}</td>
              <td>{{ custodian.phoneNumber }}</td>
              <td>{{ custodian.email }}</td>
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
        departments:Object,
        custodians:Object,
    },
    data(){
      return {
        formData:{
            id:0,
            name:'',
            department:'',
            phoneNumber:'',
            email:''
        },
        department:null,
        custodinian:null,
        formEnabled:false
      }
    },
    components:{
      Button,
    },
    methods: {
        onDeleteCustodian(id){
        const yes = confirm('Do you want to remove this Custodian permanently?')
        if(yes)
        {
          const serializedData = JSON.stringify(id)
          this.$router.push({ name: 'deletingcustodian', query: { data: serializedData } });
        }
      },
        onInsertCustodian(e){
        e.preventDefault();
          const serializedData = JSON.stringify(this.formData)
          this.$router.push({ name: 'addingcustodian', query: { data: serializedData } });
        },
        showUpdateForm(custodian){
            this.formEnabled = true;
            this.formData.id = custodian.id;
            this.formData.name = custodian.name;
            this.formData.department = custodian.department;
            this.formData.phoneNumber = custodian.phoneNumber;
            this.formData.email = custodian.email;
        },
        onUpdateCustodian(e){
            e.preventDefault();
            const serializedData = JSON.stringify(this.formData)
            this.$router.push({ name: 'updatingcustodian', query: { data: serializedData } });
        },
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
  