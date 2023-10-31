<template>
    <div v-if="updateLoading || insertLoading" class="loading-spinner"></div>
</template>
<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
export default{
  name: 'addingrelation',
  setup() {
    const { mutate: updateMaterial, loading: updateLoading, error: updateError } = useMutation(gql`
      mutation UpdateMaterial($serialNumber: String!, $takenMaterial: Int!) {
        update_Material(_set: { taken: $takenMaterial }, where: { serialNumber: { _eq: $serialNumber } }) {
          affected_rows
        }
      }
    `);
    const { mutate: insertMaterialCustodianRel, loading: insertLoading, error: insertError } = useMutation(gql`
      mutation InsertMaterialCustodianRel($amount: Int!, $materialsSerialNumber: String!, $userName: String!) {
        insert_materialCustodianRel_one(object: { amount: $amount, materialsSerialNumber: $materialsSerialNumber, userName: $userName }) {
          amount
          id
          materialsSerialNumber
          userName
        }
      }
    `);

    return {
      updateMaterial,
      updateLoading,
      updateError,
      insertMaterialCustodianRel,
      insertLoading,
      insertError,
    };
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const materialCustodianRel = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    await this.insertMaterialCustodianRelAndSetTaken(materialCustodianRel);
  },
  methods: {
    async insertMaterialCustodianRelAndSetTaken(materialCustodianRel) {
      try {
        const { amount, id, materialsSerialNumber, userName, takenMaterial } = materialCustodianRel;

        await this.updateMaterial({
          serialNumber: materialsSerialNumber,
          takenMaterial: takenMaterial,
        });
        // Insert materialCustodianRel
        await this.insertMaterialCustodianRel({
          amount,
          materialsSerialNumber,
          userName,
        });
        alert('Inserted Successfully!');
        this.$router.push({ name: 'service' });
      } catch (error) {
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