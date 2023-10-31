<template>
  <div v-if="deleteLoading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'deletingrelation',
  setup() {
    try{
      const { mutate: deleteRelation, loading: deleteLoading, error: deleteError } = useMutation(gql`
      mutation deleteRelation($id: Int!) {
        delete_materialCustodianRel(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `);
    const { mutate: updateMaterial, loading: updateLoading, error: updateError } = useMutation(gql`
      mutation UpdateMaterial($serialNumber: String!, $takenMaterial: Int!) {
        update_Material(_set: { taken: $takenMaterial }, where: { serialNumber: { _eq: $serialNumber } }) {
          affected_rows
        }
      }
    `);
    return {
      deleteRelation,
      deleteLoading,
      deleteError,
      updateMaterial,
      updateLoading,
      updateError,
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
    const formData = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    if (formData) {
      await this.deletingRelation(formData);
    }
  },
  methods: {
    async deletingRelation(formData) {
      try {
        const { materialsSerialNumber,takenMaterial, id } = formData;

        // Update material's 'taken' field
        await this.updateMaterial({
          serialNumber: materialsSerialNumber,
          takenMaterial : takenMaterial,
        });

        // Update materialCustodianRel's 'amount' field
        await this.deleteRelation({
          id
        });

        alert('Updated Successfully!');
        this.$router.push({ name: 'service' });
      } catch (error) {
        console.error('Error during updating:', error);
        alert('Error occurred while updating!');
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