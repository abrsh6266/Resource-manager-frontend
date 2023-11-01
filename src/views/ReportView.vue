<template>
  <Navbar />
  <div v-if="loading" class="loading-spinner"></div>
  <div v-else-if="error && onError"></div>
  <div v-else-if="onResult" class="report">
    <h1 class="report-heading">Report</h1>
    <table class="report-table" id="myTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total</th>
          <th>Taken</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in onResult" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.total }}</td>
          <td>{{ category.taken }}</td>
          <td>
            <button @click="showDetails(category.Materials)">
              Show Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <transition name="modal">
      <ProductFormVue
        v-if="showProductForm"
        @close="closeProductForm"
        @save="saveProduct"
        :material="materialss"
      />
    </transition>
    <button @click="exportToExcel">Export to Excel</button>
  </div>
</template>
<script>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Navbar from "../components/Navbar.vue";
import ProductFormVue from "../components/ProductForm.vue";
import * as XLSX from "xlsx";
const get_material = gql`
  query GetMaterial {
    Category(
      where: { Materials_aggregate: { count: { predicate: { _gte: 1 } } } }
    ) {
      name
      id
      Materials {
        serialNumber
        total
        taken
      }
    }
  }
`;
export default {
  name: "report",
  data() {
    return {
      materialss: [],
      showProductForm: false,
    };
  },
  components: {
    Navbar,
    ProductFormVue,
  },
  setup() {
    const { result, loading, error } = useQuery(get_material);
    return {
      result,
      loading,
      error,
    };
  },
  computed: {
    onError() {
      alert("something wrong please try again");
      this.$router.push({ name: "login" });
      return true;
    },
    onResult() {
      let parsedData;
      if (this.result) {
        parsedData = this.result.Category.map((category) => {
          const total = category.Materials.reduce(
            (acc, material) => acc + material.total,
            0
          );
          const taken = category.Materials.reduce(
            (acc, material) => acc + material.taken,
            0
          );
          return {
            id: category.id,
            name: category.name,
            total,
            taken,
            Materials: category.Materials,
          };
        });
      }
      return parsedData;
    },
  },
  methods: {
    exportToExcel() {
      const data = this.onResult.map((category) => ({
        Name: category.name,
        Total: category.total,
        Taken: category.taken,
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "report.xlsx");
    },
    closeProductForm() {
      this.showProductForm = false;
    },
    showDetails(materials) {
      this.showProductForm = true;
      this.materialss = materials;
    },
  },
};
</script>
 <style>
/* Styling the table */
.report {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}
.report-heading {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
.report-table {
  width: 100%;
  border-collapse: collapse;
}
.report-table th {
  background-color: #333;
  color: #bf9393;
  padding: 10px;
  text-align: left;
  font-size: 18px;
}
.report-table td {
  background-color: #ffffff;
  color: #0f0c0c;
  padding: 10px;
  font-size: 16px;
}
.report-table tr:hover {
  background-color: #ddd;
}
</style>