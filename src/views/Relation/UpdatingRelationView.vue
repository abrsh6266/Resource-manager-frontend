<template>
  <div v-if="updateLoading || updateRelLoading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'updatingrelation',
  setup() {
    const { mutate: updateMaterial, loading: updateLoading, error: updateError } = useMutation(gql`
      mutation UpdateMaterial($serialNumber: String!, $takenMaterial: Int!) {
        update_Material(_set: { taken: $takenMaterial }, where: { serialNumber: { _eq: $serialNumber } }) {
          affected_rows
        }
      }
    `);
    const { mutate: updateMaterialCustodianRel, loading: updateRelLoading, error: updateRelError } = useMutation(gql`
      mutation UpdateMaterialCustodianRel($materialsSerialNumber: String!, $userName: String!, $amount: Int!) {
        update_materialCustodianRel(
          where: { materialsSerialNumber: { _eq: $materialsSerialNumber }, userName: { _eq: $userName } },
          _set: { amount: $amount }
        ) {
          affected_rows
        }
      }
    `);
    return {
      updateMaterial,
      updateLoading,
      updateError,
      updateMaterialCustodianRel,
      updateRelLoading,
      updateRelError,
    };
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const materialCustodianRel = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    await this.updateMaterialAndRelation(materialCustodianRel);
  },
  methods: {
    async updateMaterialAndRelation(materialCustodianRel) {
      try {
        const { materialsSerialNumber, userName, amount,takenMaterial } = materialCustodianRel;

        // Update material's 'taken' field
        await this.updateMaterial({
          serialNumber: materialsSerialNumber,
          takenMaterial: takenMaterial,
        });

        // Update materialCustodianRel's 'amount' field
        await this.updateMaterialCustodianRel({
          materialsSerialNumber,
          userName,
          amount,
        });

        alert('Updated Successfully!');
        this.$router.push({ name: 'service' });
      } catch (error) {
        console.error('Error during updating:', error);
        alert('Error occurred while updating!');
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