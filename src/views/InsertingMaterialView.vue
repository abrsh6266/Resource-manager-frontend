<template>
    <div v-if="loading" class="loading-spinner"></div>
</template>
<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import SignUp from '../components/SignUp.vue'
export default{
  name: 'SignupView',
  components:{
    SignUp,
  },
  setup() {
        const { mutate: insertMaterial, loading, error } = useMutation(gql`
        mutation InsertMaterialOne($name: String!,$storage: String!,$ram: String!,$serialNumber: String!,$type: String!,$processor: String!,$diskType: String!,$model: String!,$networkType: String!,$scanType: String!,$owner: String!,$total: Int!) {
          insert_Material_one(object: {name: $name, ram:$ram, storage:$storage, serialNumber: $serialNumber, type: $type, processor: $processor, diskType: $diskType, model: $model, networkType: $networkType, scanType: $scanType, owner: $owner, total: $total}) {
            name
            serialNumber
            type
            storage
            ram
            processor
            diskType
            model
            networkType
            scanType
            owner
            total
            Id
          }
        }
      `);
      return {
      insertMaterial,
      loading,
      error
    };
    },
    async mounted(){
      const route = useRoute();
      const dataParam = route.query.data;
      const material = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
      console.log(material)
      await this.insertingMaterial(material);
    },
  methods:{
    async insertingMaterial(material) {
      try {
        console.log(material)
        const { name,serialNumber,model,type,processor,diskType,networkType,scanType,owner,total,storage,ram } = material;
        const { data } = await this.insertMaterial({
          name,
          serialNumber,
          model,
          type,
          ram,
          storage,
          processor,
          diskType,
          networkType,
          scanType,
          owner,
          total
        });
        alert('inserted Successfully!')
        console.log('inserted material:', data.insert_Manager_one);
        this.$router.push({ name: 'inventory'});
      } catch (error) {
        setTimeout({
          if(data){
            alert('Inserted Successfully!')
            console.log('inserted Material:', data.insert_Manager_one);
            this.$router.push({ name: 'inventory'});
            return
          }
        },3000)
        console.error('Error during insertion:', error);
        alert('error occurred!')
        this.$router.push({ name: 'inventory'});
      }
    }
  }
}
</script>
<style scoped>
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-left: calc(45%);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
