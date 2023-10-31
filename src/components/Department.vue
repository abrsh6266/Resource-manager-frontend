<template>
    <div class="department" @back-home="onBackHome">
        <h4 >
           Department :{{department.name }}
        </h4>
        <p v-show="departmentShow">location : {{department.location }}</p>
        <Button v-show="departmentShow"
        @click="showCustodian" 
        text="See detail" 
        color="red"/>
        <ul v-if="custodianShow">
          <h4 class="custodian-heading">
          List of Members
        </h4>
          <li v-for="cust of department.Custodians" :key="cust.id">
            <Custodian :custodian="cust" />
          </li>
          <Button
          @click="onBackHome"
          text="Back" 
          color="red"/>
        </ul>
    </div>
</template>
<script>
import Button from './Button.vue'
import Custodian from './Custodian.vue'
export default{
    name: 'Department',
    props:{
        department: Object,
    },
    components:{
      Button,
      Custodian
    },
    methods:{
      showCustodian(){
        this.departmentShow=false;
        this.custodianShow=true;
      },
      onBackHome(){
        this.departmentShow=true;
        this.custodianShow=false;
      }
    },
    data(){
      return{
        departmentShow:true,
        custodianShow:false,
      }
    }
}
</script>
<style scoped>
.department {
  border-radius: 10px 20px 30px 40px;
  width: calc(80%);
  background-image: url(./img/department.jpeg);
  margin: 10px;
  padding: 10px 20px;
  border-left: 5px solid rgb(80, 163, 80);
  transition: 0.2s;
}
.custodian-heading{
  margin-left: calc(20%);
}
.department:hover{
  transform: scale(1.05);
}
.department h4 {
  display: flex;
  align-items: center;
  justify-content:first baseline;
}
</style>
