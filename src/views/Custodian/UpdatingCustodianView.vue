<template>
  <div v-if="loading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'updatingcustodian',
  setup() {
    try {
      const { mutate: updateCustodian, loading, error } = useMutation(gql`
        mutation UpdateCustodian($id: Int!, $department: String!, $email: String!, $name: String!, $phoneNumber: String!) {
          update_Custodian(where: { id: { _eq: $id } }, _set: { department: $department, email: $email, name: $name, phoneNumber: $phoneNumber }) {
            affected_rows
          }
        }
      `);
      return {
        updateCustodian,
        loading,
        error,
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
    const custodian = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    await this.updateCustodiann(custodian);
  },
  methods: {
    async updateCustodiann(custodian) {
      try {
        const { id, department, email, name, phoneNumber } = custodian;
        const { data } = await this.updateCustodian({
          id,
          department,
          email,
          name,
          phoneNumber,
        });
        if (data && data.update_Custodian && data.update_Custodian.affected_rows > 0) {
          alert('Custodian updated successfully!');
          this.$router.push({ name: 'service' });
        } else {
          alert('Failed to update Custodian!');
          this.$router.push({ name: 'service' });
        }
      } catch (error) {
        console.error('Error during updating:', error);
        alert('Error occurred while updating the Custodian!');
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