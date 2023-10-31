<template>
    <div class="form-container">
      <form >
        <label for="name">Name:</label>
        <select id="name" v-model="formData.name" required>
            <option v-for="category in categories" :key="category.id"  :value="category.name">{{ category.name }}</option>
        </select>
        <label for="serialNumber" >Serial Number:</label>
        <input type="text" id="serialNumber" v-model="formData.serialNumber" required>
  
        <label for="model">Model:</label>
        <input type="text" id="model" v-model="formData.model">
  
        <label for="type">Type:</label>
        <input type="text" id="type" v-model="formData.type">
  
        <label for="processor">Processor:</label>
        <input type="text" id="processor" v-model="formData.processor">
  
        <label for="diskType">Disk Type:</label>
        <input type="text" id="diskType" v-model="formData.diskType">
  
        <label for="networkType">Network Type:</label>
        <input type="text" id="networkType"  v-model="formData.networkType">
  
        <label for="scanType">Scan Type:</label>
        <input type="text" id="scanType" v-model="formData.scanType">
  
        <label for="owner">Owner:</label>
        <input type="text" id="owner" v-model="formData.owner">
  
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" v-model="formData.total" min="0" @input="validateQuantity">
        <button  @click="onClick">Update</button>
      </form>
    </div>
  </template>
  <script>
  import Button from './Button.vue'
  export default {
    data() {
      return {
        formData: {
          Id:-1,
          name: '',
          serialNumber: '',
          model: '',
          type: '',
          processor: '',
          diskType: '',
          networkType: '',
          scanType: '',
          owner: '',
          total: 0,
        },
      };
    },
  beforeUpdate() {
    if (this.inventory&&this.formData.Id===-1) {
      console.log(this.inventory)
      this.formData.Id = this.inventory.Id
      this.formData.name = this.inventory.name;
      this.formData.serialNumber = this.inventory.serialNumber;
      this.formData.model = this.inventory.model;
      this.formData.type = this.inventory.type;
      this.formData.processor = this.inventory.processor;
      this.formData.diskType = this.inventory.diskType;
      this.formData.networkType = this.inventory.networkType;
      this.formData.scanType = this.inventory.scanType;
      this.formData.owner = this.inventory.owner;
      this.formData.total = this.inventory.total;
    }
  },
    components:{
        Button
    },
    props:{
        categories: Object,
        inventory: Object,
    },
    methods: {
        onClick(e) {
        e.preventDefault();
        const serializedData = JSON.stringify(this.formData)
        this.$router.push({ name: 'updatingmaterial', query: { data: serializedData } });
      },
    },
  };
  </script>
  
  <style>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }
  form {
    display: grid;
    gap: 10px;
  }

  label {
    font-weight: bold;
    color: #333;
  }

  select,
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
