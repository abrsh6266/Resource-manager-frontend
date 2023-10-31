<template>
    <div v-if="loading" class="loading-spinner"></div>
</template>
<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
export default{
  name: 'insertingmaterial',
  setup() {
        const { mutate: insertDepartment, loading, error } = useMutation(gql`
        mutation InsertDepartmentOne($name: String!,$location: String!) {
          insert_Department_one(object: {name: $name,location:$location}) {
            name
            location
          }
        }
      `);
      return {
      insertDepartment,
      loading,
      error
    };
    },
    async mounted(){
      const route = useRoute();
      const dataParam = route.query.data;
      const department = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
      await this.insertingDepartment(department);
    },
  methods:{
    async insertingDepartment(department) {
      try {
        const { name,location } = department;
        const { data } = await this.insertDepartment({
          name,
          location
        });
        alert('inserted Successfully!')
        this.$router.push({ name: 'service'});
      } catch (error) {
        setTimeout({
          if(data){
            alert('Inserted Successfully!')
            this.$router.push({ name: 'service'});
            return
          }
        },3000)
        console.error('Error during insertion:', error);
        alert('error occurred!')
        this.$router.push({ name: 'service'});
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