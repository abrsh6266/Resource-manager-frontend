<template>
  <div v-if="deleteLoading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'deletingmaterial',
  setup() {
    try{
      const { mutate: deleteMaterial, loading: deleteLoading, error: deleteError } = useMutation(gql`
      mutation DeleteMaterial($Id: Int!) {
        delete_Material(where: { Id: { _eq: $Id } }) {
          affected_rows
        }
      }
    `);
    return {
      deleteMaterial,
      deleteLoading,
      deleteError,
    };
  }catch(error){
      console.log('something wrong!!: ',error)
      alert('something wrong!')
      this.$router.push({ name: 'inventory' });
    }
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const Id = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    if (Id) {
      await this.deleteMateriall(Id);
    }
  },
  methods: {
    async deleteMateriall(Id) {
      try {
        const { data } = await this.deleteMaterial({ Id:parseInt(Id) });
        console.log(data.delete_Material.affected_rows)
        this.$router.push({ name: 'inventory'});
        if (data && data.delete_Material && data.delete_Material.affected_rows > 0) {
          alert('Material deleted successfully!');
          this.$router.push({ name: 'inventory' });
        } else {
          alert('Failed to delete material!');
          this.$router.push({ name: 'inventory' });
        }
      } catch (error) {
        console.error('Error during material deletion:', error);
        alert('Error occurred while deleting the material!');
        this.$router.push({ name: 'inventory' });
      }
    }
  }
}
</script>

<style scoped>
/* Your existing styles here */

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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>