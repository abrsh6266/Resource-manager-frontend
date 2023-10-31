<template>
    <div v-if="loading" class="loading-spinner"></div>
</template>
<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
const INSERT_CUSTODIAN_MUTATION = gql`
  mutation InsertCustodianOne($department: String!, $email: String!, $name: String!, $phoneNumber: String!) {
    insert_Custodian_one(object: { department: $department, email: $email, name: $name, phoneNumber: $phoneNumber }) {
      name
      phoneNumber
    }
  }
`;

export default {
  name: 'insertingcustodian',
  setup() {
    const { mutate: insertCustodian, loading, error } = useMutation(INSERT_CUSTODIAN_MUTATION);
    return {
      insertCustodian,
      loading,
      error,
    };
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const custodian = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    await this.insertingCustodian(custodian);
  },
  methods: {
    async insertingCustodian(custodian) {
      try {
        const { department, email, name, phoneNumber } = custodian;
        const { data } = await this.insertCustodian({
          department,
          email,
          name,
          phoneNumber,
        });
        alert('Inserted Successfully!');
        this.$router.push({ name: 'service' });
      } catch (error) {
        setTimeout(() => {
          if (data) {
            alert('Inserted Successfully!');
            this.$router.push({ name: 'service' });
            return;
          }
        }, 3000);
        console.error('Error during insertion:', error);
        alert('Error occurred!');
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>