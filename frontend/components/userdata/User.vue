<template>
  <div
    :class="['text-container', { active: !isSidebarCollapsed }]"
    class="mt-10"
  >
    <!-- Table -->
    <transition name="table-slide">
      <div
        v-if="isTableVisible"
        class="table-container"
        :class="{ collapsed: isSidebarCollapsed }"
      >
        <div class="title text-center text-xl">Users Table</div>
        <el-table
          ref="multipleTable"
          :data="
            usersData.filter(
              (data) =>
                !search ||
                data.username.toLowerCase().includes(search.toLowerCase()) ||
                data.address.toLowerCase().includes(search.toLowerCase())
            )
          "
          :row-class-username="rowClassusername"
          max-height="250"
          @selection-change="handleSelectionChange"
        >
          >
          <el-table-column type="selection" width="55" />
          <el-table-column fixed label="Date" width="180" prop="createdAt" />
          <el-table-column fixed prop="username" label="Username" width="180" />
          <el-table-column prop="address" label="Address" width="180">
            <template slot-scope="scope">
              <!-- Replace empty cell by '-' --->
              <div v-if="scope.row.address !== null">
                {{ scope.row.address }}
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email" width="180">
            <template slot-scope="scope">
              <!-- Replace empty cell by '-' --->
              <div v-if="scope.row.email !== null">
                {{ scope.row.email }}
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="200">
            <template slot="header">
              <el-input
                v-model="search"
                size="medium"
                placeholder="Type to search"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row), (visible = true)"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-right text-[#606266] font-[400] mr-[10px] text-[13px]">
          Total {{ usersData.length }} Users
        </div>
        <div class="mt-10">
          <el-button
            icon="el-icon-refresh"
            :loading="loadingClear"
            @click="toggleSelection()"
          >
            Clear selection
          </el-button>
          <el-button
            icon="el-icon-delete"
            :loading="loadingDelete"
            @click="toggleDelete()"
          >
            Delete
          </el-button>
          <el-button
            icon="el-icon-plus"
            :loading="loadingAdd"
            @click="userVisible = true"
          >
            Add User
          </el-button>
        </div>
      </div>
    </transition>
    <!-- Form Edit -->
    <div>
      <el-dialog
        :visible.sync="visible"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="Edit User Form"
        custom-class="dialog-form"
        @close="closeDialogForm"
      >
        <!-- Your form content goes here -->
        <!-- For demonstration purposes, we use a simple input field -->
        <el-form
          ref="formEdit"
          :model="formEdit"
          :rules="formEditRules"
          label-position="left"
          label-width="100px"
          @submit.native.prevent="editForm('formEdit')"
        >
          <el-form-item label="Name">
            <el-input v-model="formEdit.username" />
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="formEdit.address" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="formEdit.email" />
          </el-form-item>
          <!-- Add more form fields here if needed -->
          <el-form-item>
            <el-button @click="visible = false"> Cancel </el-button>
            <el-button native-type="submit" :loading="loadingEditForm">
              Submit
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- Form Add -->
    <div>
      <el-dialog
        :visible.sync="userVisible"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="Add User Form"
        custom-class="dialog-form"
        @close="closeDialogForm"
      >
        <!-- Your form content goes here -->
        <!-- For demonstration purposes, we use a simple input field -->
        <el-form
          ref="formAdd"
          :model="formAdd"
          label-position="left"
          label-width="200px"
          :rules="formAddRules"
          @submit.native.prevent="addForm('formAdd')"
        >
          <el-form-item label="Username">
            <el-input v-model="formAdd.username" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              v-model="formAdd.password"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input
              v-model="formAdd.confPassword"
              type="password"
              show-password
            />
          </el-form-item>
          <!-- Add more form fields here if needed -->
          <el-form-item>
            <el-button @click="userVisible = false"> Cancel </el-button>
            <el-button native-type="submit" :loading="loadingAddForm">
              Submit
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  async asyncData({ store }) {
    // You can also set the isSidebarCollapsed state on server-side rendering
    await store.commit('sidebar/setSidebarCollapsed', true)
  },
  data() {
    return {
      defaultActive: 'user-management',
      isTableVisible: true,
      visible: false,
      userVisible: false,
      search: '',

      /* LOADING */
      loadingClear: false,
      loadingDelete: false,
      loadingAdd: false,
      loadingAddForm: false,
      loadingEditForm: false,

      /* Form Edit */
      formEdit: {
        id: '',
        username: '',
        address: '',
        email: '',
      },

      formAdd: {
        username: '',
        password: '',
        confPassword: '',
      },

      formEditRules: {
        username: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },

      formAddRules: {
        username: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        confPassword: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    rowClassusername({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
    },
    ...mapGetters('sidebar', ['isSidebarCollapsed']),
    ...mapGetters({
      usersData: ['users/getUsers'],
    }),
  },

  async created() {
    if (process.browser) {
      try {
        await this.fetchUsers()
      } catch (error) {
        this.$message({
          title: 'error',
          message: error,
          type: 'error',
        })
      }
    }
  },

  methods: {
    ...mapActions('users', [
      'fetchUsers',
      'fetchEdit',
      'createUser',
      'fetchDel',
    ]),
    ...mapMutations('sidebar', ['setSidebarCollapsed']), // Accessing the setSidebarCollapsed mutation from the 'sidebar' module in the store
    toggleSidebar() {
      this.setSidebarCollapsed(!this.isSidebarCollapsed)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    toggleDelete() {
      this.$confirm('Are you sure for delete this data?', 'Confirm', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
        .then(() => {
          this.fetchDel(this.multipleSelection)
          this.loadingDelete = true
          this.$message({
            type: 'info',
            message:
              'Changes saved. Proceeding to a new route, Please refresh browser for New Data.',
          })
          this.loadingDelete = false
        })
        .catch((action) => {
          this.loadingDelete = false
          this.$message({
            type: 'info',
            message:
              action === 'cancel'
                ? 'Changes discarded. Proceeding to a new route.'
                : 'Stay in the current route',
          })
        })
    },

    closeDialogForm() {
      this.visible = false
    },

    handleEdit(payload) {
      this.formEdit = { ...payload }
    },

    async editForm(form) {
      try {
        this.visible = true
        await this.fetchEdit({
          id: this.formEdit.id,
          username: this.formEdit.username,
          email: this.formEdit.email,
          address: this.formEdit.address,
        })
        this.loadingEditForm = true
        this.visible = false
      } catch (error) {
        if (error.response) {
          this.loadingEditForm = false
          this.$message({
            title: 'error',
            message: error.response.data.msg,
            type: 'error',
          })
        }
      }
    },

    addForm(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.userVisible = true
            this.error = ''
            this.loadingAddForm = true
            await this.createUser(this.formAdd)
            this.$message({
              title: 'success',
              message: 'You did it',
              type: 'success',
              onClose: setTimeout(() => {
                this.formAdd = {
                  username: '',
                  password: '',
                  confPassword: '',
                }
                this.loadingAddForm = false
              }, 1000),
            })
            this.userVisible = false
            return true
          } catch ({ response: { data } }) {
            this.error = data
            this.success = ''
            this.loadingAddForm = false
            return false
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style>
/* Table Container Styles */
.table-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10rem;
  padding: 20px;
  overflow-x: hidden; /* Hide overflow while sliding */
  transition: width 0.3s ease-in-out; /* Added transition for smooth animation */
}

/* Adjust the width when the sidebar is collapsed */
.table-container.collapsed {
  @apply w-full
  @apply ml-[7rem];
}
</style>
