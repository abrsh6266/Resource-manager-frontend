<template>
  <div>
    <Navbar />
    <div v-if="loading" class="loading-spinner"></div>
    <div v-else-if="error && onError"></div>
    <div v-else-if="result">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="manager in result.Manager" :key="manager.id">
            <td>{{ manager.name }}</td>
            <td>{{ manager.email }}</td>
            <td>{{ manager.password }}</td>
            <td>{{ manager.role }}</td>
            <td>
              <i
                @click="deleteManager(manager.id)"
                class="fa-solid fa-trash-can"
              ></i>
              <i
                @click="editManager(manager)"
                class="fa-solid fa-pen-to-square"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <transition>
        <ManagerEdit
          v-if="showManagerForm"
          @close="closeManagerForm"
          @save="onEditManager"
          :manager="manager"
        />
      </transition>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import ManagerEdit from "../components/ManagerEdit.vue";
const GET_MANAGERS_QUERY = gql`
  query {
    Manager {
      email
      id
      name
      password
      role
    }
  }
`;
export default {
  name: "managers",
  components: {
    Navbar,
    ManagerEdit,
  },
  data() {
    return {
      showManagerForm: false,
      manager: null,
    };
  },
  setup() {
    const { result, loading, error } = useQuery(GET_MANAGERS_QUERY);
    if (result) {
      console.log(result);
    }
    const {
      mutate: deleteManager,
      loading: deleteLoading,
      error: deleteError,
    } = useMutation(gql`
      mutation deleteRelation($id: Int!) {
        delete_Manager_by_pk(id: $id) {
          email
        }
      }
    `);
    const { mutate: UpdateManager } = useMutation(gql`
      mutation UpdateManager(
        $id: Int!
        $email: String!
        $password: String!
        $role: String!
        $name: String!
      ) {
        update_Manager_by_pk(
          pk_columns: { id: $id }
          _set: { email: $email, password: $password, role: $role, name: $name }
        ) {
          email
          id
          password
          role
          token
        }
      }
    `);
    return {
      UpdateManager,
      deleteManager,
      deleteLoading,
      deleteError,
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
  },
  methods: {
    openManagerForm() {
      this.showManagerForm = true;
    },
    closeManagerForm() {
      this.showManagerForm = false;
    },
    editManager(manager) {
      this.manager = manager;
      this.showManagerForm = true;
    },
    async deleteManager(managerId) {
      const yes = confirm("Do you want to remove this Manager?");
      if (yes) {
        try {
          const id = managerId;
          await this.deleteManager({
            id,
          });
          alert("deleted Successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Error during deleting:", error);
          alert("Error occurred while deleting!");
        }
      }
    },
    async onEditManager(manager) {
      try {
        const { id, name, password, email, role } = manager;
        const result = await this.UpdateManager({
          id,
          name,
          password,
          email,
          role,
        })
        if(result.data.update_Manager_by_pk){
          alert("Updated Successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during updating:", error);
        alert("Error occurred while updating!");
      }
    },
  },
};
</script>
<style sccoped>
/* Your table styling here */
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
i {
  margin: 4px;
  font-size: 20px;
}
.fa-solid:hover {
  color: red;
}
table {
  margin: 10px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
th,
td {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
th {
  text-align: left;
  background-color: #0e1530;
}
tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-top: calc(20%);
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