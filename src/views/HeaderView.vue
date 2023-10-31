<template>
    <div class="container">
        <header>
        <router-link to="/login">
            <h1>Inventory Management</h1>
        <Button @click="onSignIn" text="Get Started" class="x" color="black" />
        </router-link>
    </header>
    </div>
</template>
<script>
import Button from '../components/Button.vue'
export default{
    name:'Header',
    props:{
        title: String,
    },
    components:{
        Button,
    },
    methods:{
        onSignIn(){
            this.$emit('sign-in')
        },
        onSignUp(){
            this.$emit('sign-up')
        }
    },
    data(){
        return {
            role:''
        }
    }

}
</script>
<style scoped>
.x {
    margin-top: calc(15%);
  margin-left: calc(35%);
}
.y {
    margin-left: calc(40%);
}
</style>





