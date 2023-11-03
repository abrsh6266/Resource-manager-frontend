<template>
    <div class="materialCustodian" >
        <h4 >
           Serial Number :{{relation.materialsSerialNumber }}
        </h4>
        <p v-show="relationShow">User Name : {{relation.userName}}</p>
        <p v-show="relationShow">Amount : {{relation.amount}}</p>
        <Button v-show="relationShow"
        @click="showCustodian" 
        text="See Custodian Details" 
        color="red"/>
        <ul v-if="custodianShow">
          <h4 class="custodian-heading">
          Custodian Detail
        </h4>
            <Custodian :custodian="relation.Custodian" />
            <Button
            @click="showRelation" 
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
        relation: Object,
    },
    components:{
      Button,
      Custodian
    },
    methods:{
      showRelation(){
        this.relationShow=true;
        this.custodianShow=false;
      },
      showCustodian(){
        this.relationShow=false;
        this.custodianShow=true;
      }
    },
    data(){
      return{
        relationShow:true,
        custodianShow:false,
      }
    }
}
</script>
<style scoped>
.materialCustodian {
  border-radius: 10px 20px 30px 40px;
  width: calc(80%);
  background-color:rgb(232, 231, 140) ;
  margin: 10px;
  padding: 10px 20px;
  border-left: 5px solid rgb(224, 239, 11);
  transition: 0.2s;
}
.custodian-heading{
  margin-left: calc(20%);
}
.materialCustodian:hover{
  transform: scale(1.05);
}
.materialCustodiant h4 {
  display: flex;
  align-items: center;
  justify-content:first baseline;
}
</style>
