<template>
   <div class="container">
    <div>
        <router-link to="/home">
        <Button 
        @click="$emit('on-back')" 
        text="Back" 
        color="red"
        />
        </router-link>
        <form @submit="onSubmit" class="add-form">
            <div class="form-field">
            <input type="text" 
            v-model="name" 
            name="name" 
            placeholder="Add Name" 
            required/>
        </div>
        <div class="form-field">
            <input type="email" 
            v-model="email" 
            name="email" 
            placeholder="Add Email" 
            required/>
        </div>
        <div class="form-field">
            <input
            type="password"
            v-model="password"
            name="password"
            placeholder="Enter Password"
            required/>
        </div>
        <div class="form-field">
            <input
            type="password"
            v-model="confirmPassword"
            name="password"
            placeholder="Confirm Password"
            required/>
        </div>
        <div class="form-field">
          <input type="submit" value="Login" class="btn btn-block" />
        </div>
        </form>
    </div>
   </div>
  </template>
<script>
import Button from './Button.vue'
export default{
    name:'SignUp',
    props:{
        showBackButton: Boolean
    },
    components:{
        Button
    },
    data(){
        return {
            manager: {
                name:'',
                email:'',
                password:'',
                confirmPassword:''
            }
            
        }
    },
    methods:{
        validateForm() {
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match');
                return false;
            }
        return true;
        },
        onSubmit(event) {
            event.preventDefault();
            if (this.validateForm()) {
                this.$emit('on-sign-up',{name:this.name,email:this.email,password:this.password})
            }
        },
    }
}
</script> 
<style scoped>@import url("https://fonts.googleapis.com/css?family=Lato:400,700");
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
form .form-field:nth-child(1)::before {
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
form .form-field:nth-child(4)::before {
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