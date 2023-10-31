<template>
  <div v-if="deleteLoading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'deletingcustodian',
  setup() {
    try {
      const { mutate: deleteCustodian, loading: deleteLoading, error: deleteError } = useMutation(gql`
        mutation DeleteCustodian($id: Int!) {
          delete_Custodian(where: { id: { _eq: $id } }) {
            affected_rows
          }
        }
      `);
      return {
        deleteCustodian,
        deleteLoading,
        deleteError,
      };
    } catch (error) {
      console.log('something wrong!!: ', error);
      alert('something wrong!');
      this.$router.push({ name: 'service' });
    }
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const id = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    console.log(id)
    if (id) {
      await this.deleteCustodiann(id);
    }
  },
  methods: {
    async deleteCustodiann(id) {
      try {
        const { data } = await this.deleteCustodian({ id: parseInt(id) });
        if (data && data.delete_Custodian && data.delete_Custodian.affected_rows > 0) {
          alert('Custodian deleted successfully!');
        } else {
          alert('Failed to delete Custodian!');
        }
        this.$router.push({ name: 'service' });
      } catch (error) {
        console.error('Error during Custodian deletion:', error);
        alert('Error occurred while deleting the Custodian!');
        this.$router.push({ name: 'service' });
      }
    },
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