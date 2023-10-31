<template>
    <div class="custodian">
        <p>Name : {{custodian.name }}</p>
        <p>Email : {{custodian.email }}</p>
        <p>Phone : {{custodian.phoneNumber }}</p>
        <div class="custodian-button">
          <Button v-show="relationShow"
          @click="showMaterialsUsed"
          text="See Materials used" 
          color="red"/>
        </div>
        <div v-show="showmaterial" class="custodian">
          <div  v-for="material of custodian.MaterialCustodianRels" :key="material.id">
          <h4>Name : {{custodian.name }}</h4>
          <p>MaterialSeialNo : {{material.materialsSerialNumber }}</p>
          <p>Amount : {{material.amount }}</p>
          </div>
          <Button
          @click="BackToCustodian"
          text="Back" 
          color="black"/>
        </div>
    </div>
</template>
<script>
import Button from './Button.vue'
export default{
    name: 'Department',
    props:{
        custodian: Object,
    },
    components:{
      Button
    },
    methods:{
      showMaterialsUsed(){
        this.relationShow = false
        this.showmaterial = true
      },
      BackToCustodian(){
        this.relationShow = true
        this.showmaterial = false
      }
    },
    data(){
      return{
        relationShow:true,
        custodianShow:false,
        showmaterial:false,
      }
    }
}
</script>
<style scoped>
.custodian {
  border-radius: 10px 20px 30px 40px;
  width: calc(80%);
  background-image: url(./img/Custtodian.avif);
  margin: 10px;
  padding: 10px 20px;
  border-left: 5px solid rgb(80, 163, 80);
  transition: 0.2s;
}
.custodian:hover{
  transform: scale(1.05);
}
.custodian h4 {
  display: flex;
  align-items: center;
  justify-content:first baseline;
}
Button{
  display: inline;
}
</style>
