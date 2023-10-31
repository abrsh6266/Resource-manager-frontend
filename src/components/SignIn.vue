<template>
    <div>
      <router-link to="/">
        <Button 
        @click="$emit('on-back')" 
        text="Back" 
        color="red"
        />
        </router-link>
        <form @submit="onSubmit" class="add-form">
          <div class="custom-select">
            <label for="role" class="role-label">Role:</label>
            <select v-model="role" id="role" >
                <option value="user" selected >User</option>
                <option value="admin">Admin</option>
            </select>
            <div class="select-arrow"></div>
        </div>
          <div class="form-field">
            <input type="email" 
            v-model="email" 
            name="email" 
            placeholder="Add Email" />
        </div>
        <div class="form-field">
            <input
            type="password"
            v-model="password"
            name="password"
            placeholder="Add Password"
            />
        </div>
        <div class="form-field">
          <input type="submit" value="Login" class="btn btn-block" />
        </div>
        </form>
    </div>
    
  </template>
<script>
import Button from './Button.vue'
export default{
    name:'SignIn',
    components:{
        Button
    },
    methods:{
        onSubmit(e){
            e.preventDefault()
            this.$emit('validate-signin',{email:this.email,password:this.password,role:this.role})
        }
    },
    data(){
        return {
                role:'user',
                email:'',
                password:''
        }
    }
}
</script> 
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");

body {
  font-family: 'Lato', sans-serif;
  color: #4A4A4A;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.custom-select {
    margin-top: calc(10%);
    margin-bottom: calc(5%);
  position: relative;
  display: inline-block;
}
.select-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555; /* You can change the color of the arrow here */
  pointer-events: none;
}
.role-label{
    font-size: 20px;

}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 8px 30px 8px 10px;
  font-size: 16px;
  border: 1px solid #555; /* You can change the border color here */
  border-radius: 4px;
  background-color: inherit;
  cursor: pointer;
  outline: none;
}
select option:checked {
  background-color: #f5f5f5; /* You can change the background color of the selected option here */
}
form {
  width: 350px;
  position: relative;
}
form .form-field::before {
  font-size: 20px;
  position: absolute;
  left: 15px;
  top: 17px;
  color: #888888;
  content: " ";
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
}
form .form-field:nth-child(2)::before {
  background-image: url(img/user-icon.png);
  width: 20px;
  height: 20px;
  top: 15px;
}
form .form-field:nth-child(3)::before {
  background-image: url(img/lock-icon.png);
  width: 16px;
  height: 16px;
}
form .form-field {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}
form input {
  font-family: inherit;
  width: 100%;
  outline: none;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  display: block;
  padding: 0.9rem 0.7rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 17px;
  color: #4A4A4A;
  text-indent: 40px;
}
form .btn {
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  margin: 0 auto;
  padding: 0.9rem 2.5rem;
  text-align: center;
  background-color: #47AB11;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 17px;
}
</style>