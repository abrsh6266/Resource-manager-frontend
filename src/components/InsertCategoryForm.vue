<template>
    <div class="form-container">
      <form >
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name">

        <button  @click="onClick">Insert</button>
      </form>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        formData: {
          name: ''
        },
      };
    },
    methods: {
        onClick(e) {
        e.preventDefault();
        if(this.formData.name===''){
          alert("empty category can not be added!" )
        }
        else{
          const serializedData = JSON.stringify(this.formData)
          this.$router.push({ name: 'insertingcategory', query: { data: serializedData } });
        }
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
