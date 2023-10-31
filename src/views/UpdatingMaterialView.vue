<template>
  <div v-if="loading" class="loading-spinner"></div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  name: 'updatingmaterial',
  setup() {
    try{const { mutate: updateMaterial, loading, error } = useMutation(gql`
      mutation UpdateMaterial($Id: Int!, $name: String!, $serialNumber: String!, $type: String!, $processor: String!, $diskType: String!, $model: String!, $networkType: String!, $scanType: String!, $owner: String!, $total: Int!) {
        update_Material(where: {Id: {_eq: $Id}}, _set: {name: $name, serialNumber: $serialNumber, type: $type, processor: $processor, diskType: $diskType, model: $model, networkType: $networkType, scanType: $scanType, owner: $owner, total: $total}) {
          affected_rows
        }
      }
    `);
    return {
      updateMaterial,
      loading,
      error,
    }
  }catch(error){
      console.log('something wrong!!: ',error)
      alert('something wrong!')
      this.$router.push({ name: 'inventory' });
    }
  },
  async mounted() {
    const route = useRoute();
    const dataParam = route.query.data;
    const material = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    if (material) {
      await this.updateMateriall(material);
    }
  },
  methods: {
    async updateMateriall(material) {
      try {
        const { Id, name, serialNumber, model, type, processor, diskType, networkType, scanType, owner, total } = material;
        const { data } = await this.updateMaterial({
          Id,
          name,
          serialNumber,
          model,
          type,
          processor,
          diskType,
          networkType,
          scanType,
          owner,
          total,
        });
        if (data && data.update_Material && data.update_Material.affected_rows > 0) {
          alert('Material updated successfully!');
          this.$router.push({ name: 'inventory' });
        } else {
          alert('Failed to update material!');
          this.$router.push({ name: 'inventory' });
        }
      } catch (error) {
        console.error('Error during updating:', error);
        alert('Error occurred while updating the material!');
        this.$router.push({ name: 'inventory' });
      }
    }
  },
};
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