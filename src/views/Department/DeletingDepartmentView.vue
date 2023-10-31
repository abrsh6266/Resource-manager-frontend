<template>
  <div v-if="deleteLoading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'deletingdepartment',
  setup() {
    try{
      const { mutate: deleteDepartment, loading: deleteLoading, error: deleteError } = useMutation(gql`
      mutation DeleteDepartment($id: Int!) {
        delete_Department(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `);
    return {
      deleteDepartment,
      deleteLoading,
      deleteError,
    };
  }catch(error){
      console.log('something wrong!!: ',error)
      alert('something wrong!')
      this.$router.push({ name: 'service' });
    }
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const id = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    if (id) {
      await this.deleteDepartmentt(id);
    }
  },
  methods: {
    async deleteDepartmentt(id) {
      try {
        const { data } = await this.deleteDepartment({ id:parseInt(id) });
        this.$router.push({ name: 'service'});
        if (data && data.delete_Department && data.delete_Department.affected_rows > 0) {
          alert('Department deleted successfully!');
          this.$router.push({ name: 'service' });
        } else {
          alert('Failed to delete department!');
          this.$router.push({ name: 'service' });
        }
      } catch (error) {
        console.error('Error during department deletion:', error);
        alert('Error occurred while deleting the Department!');
        this.$router.push({ name: 'service' });
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>