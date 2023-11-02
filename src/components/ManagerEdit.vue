<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Manager Editing form</h3>
          <div>
            <form @submit.prevent="EditManager" class="add-form">
              <div class="form-field">
                <input
                  type="text"
                  v-model="formData.name"
                  name="name"
                  placeholder="Add Name"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  type="email"
                  v-model="formData.email"
                  name="email"
                  placeholder="Add Email"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  type="password"
                  v-model="formData.password"
                  name="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div class="form-field">
                <select v-model="formData.role" name="role" required>
                  <option value="user">USER</option>
                  <option value="admin">ADMIN</option>
                </select>
              </div>
              <div class="form-field">
                <input
                  type="submit"
                  value="Save Changes"
                  class="btn btn-block"
                />
              </div>
            </form>
          </div>
          <button class="modal-default-button" @click="closeForm">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    manager: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        id: this.manager.id || 0,
        name: this.manager.name || "",
        password: this.manager.password || "",
        email: this.manager.email || "",
        role: this.manager.role || "",
      },
    };
  },
  methods: {
    closeForm() {
      this.formData = null;
      this.$emit("close");
    },
    EditManager() {
      this.$emit("save", this.formData);
      this.closeForm();
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

button {
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.materialCustodian {
  border-radius: 10px 20px 30px 40px;
  width: calc(80%);
  background-image: url(./img/department.jpeg);
  margin: 10px;
  padding: 10px 20px;
  border-left: 5px solid rgb(80, 163, 80);
  transition: 0.2s;
}
.custodian-heading {
  margin-left: calc(20%);
}
.materialCustodian:hover {
  transform: scale(1.05);
}
.materialCustodiant h4 {
  display: flex;
  align-items: center;
  justify-content: first baseline;
}
</style>
