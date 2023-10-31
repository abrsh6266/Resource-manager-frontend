<template>
  <div v-if="loading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'updatingdepartment',
  setup() {
    try{const { mutate: updateDepartment, loading, error } = useMutation(gql`
      mutation UpdateDepartment($id: Int!, $name: String!, $location: String!) {
        update_Department(where: {id: {_eq: $id}}, _set: {name: $name, location: $location}) {
          affected_rows
        }
      }
    `);
    return {
      updateDepartment,
      loading,
      error,
    }
  }catch(error){
      console.log('something wrong!!: ',error)
      alert('something wrong!')
      this.$router.push({ name: 'service' });
    }
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const department = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
      await this.updateDepartmentt(department);
  },
  methods: {
    async updateDepartmentt(department) {
      try {
        const { id, name, location } = department;
        const { data } = await this.updateDepartment({
          id,
          name,
          location
        });
        if (data && data.update_Department && data.update_Department.affected_rows > 0) {
          alert('Department updated successfully!');
          this.$router.push({ name: 'service' });
        } else {
          alert('Failed to update Department!');
          this.$router.push({ name: 'service' });
        }
      } catch (error) {
        console.error('Error during updating:', error);
        alert('Error occurred while updating the Department!');
        this.$router.push({ name: 'service' });
      }
    }
  },
};
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