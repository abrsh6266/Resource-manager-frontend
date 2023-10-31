<template>
    <div v-if="loading" class="loading-spinner"></div>
</template>
<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import SignUp from '../components/SignUp.vue'
export default{
  name: 'insertingmaterial',
  components:{
    SignUp,
  },
  setup() {
        const { mutate: insertCategory, loading, error } = useMutation(gql`
        mutation InsertMaterialOne($name: String!) {
          insert_Category_one(object: {name: $name}) {
            name
          }
        }
      `);
      return {
      insertCategory,
      loading,
      error
    };
    },
    async mounted(){
      const route = useRoute();
      const dataParam = route.query.data;
      const category = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
      console.log(category)
      await this.insertingCategory(category);
    },
  methods:{
    async insertingCategory(category) {
      try {
        console.log(category)
        const { name } = category;
        const { data } = await this.insertCategory({
          name
        });
        alert('inserted Successfully!')
        console.log('inserted Category:', data.insert_Category_one);
        this.$router.push({ name: 'inventory'});
      } catch (error) {
        setTimeout({
          if(data){
            alert('Inserted Successfully!')
            console.log('inserted Category:', data.insert_Category_one);
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
