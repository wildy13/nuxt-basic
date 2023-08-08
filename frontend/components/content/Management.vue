<template>
  <div class="">
    <div
      :class="['text-container', { active: !isSidebarCollapsed }]"
      class="mt-15"
    >
      <Transition name="content-slide">
        <div
          class="bg-slate-200 border-2 border-slate-300"
          :class="['content-container', { collapsed: isSidebarCollapsed }]"
        >
          <el-button
            icon="el-icon-plus"
            :loading="loadingAdd"
            @click="categoryVisible = true"
          >
            Add Category
          </el-button>
        </div>
      </Transition>

      <!-- Form Add -->
      <div>
        <el-dialog
          :visible.sync="categoryVisible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="Add Category Form"
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
            <el-form-item label="Name">
              <el-input v-model="formAdd.name" />
            </el-form-item>
            <!-- Add more form fields here if needed -->
            <el-form-item>
              <el-button @click="categoryVisible = false"> Cancel </el-button>
              <el-button native-type="submit" :loading="loadingAddForm">
                Submit
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
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
      fileList: [],
      row: {},
      id: '',
      categoryVisible: false,
      loadingAdd: false,
      loadingAddForm: false,

      /* Form Add */
      formAdd: {
        id: this.$auth.user.id,
        name: '',
      },

      /* Rules */
      formAddRules: {
        name: [
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
    ...mapGetters('sidebar', ['isSidebarCollapsed']),
  },

  methods: {
    ...mapActions('category', ['createCategory']),
    ...mapMutations('sidebar', ['setSidebarCollapsed']), // Accessing the setSidebarCollapsed mutation from the 'sidebar' module in the store
    toggleSidebar() {
      this.setSidebarCollapsed(!this.isSidebarCollapsed)
    },

    addForm() {
      try {
        this.createCategory(this.formAdd)
        this.$message({
          title: 'success',
          message: 'You did it',
          type: 'success',
          onClose: setTimeout(() => {
            this.formAdd = {
              name: '',
            }
            this.categoryVisible = false
          }, 1000),
        })
      } catch ({ response: { data } }) {
        this.error = data
        this.success = ''
        this.categoryVisible = false
        return false
      }
    },

    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    closeDialogForm() {
      this.categoryVisible = false
    },
  },
}
</script>

<style>
/* directory Slide Animation */
.content-slide-enter-active,
.content-slide-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.content-slide-enter,
    .directory-slide-leave-to /* .directory-slide-leave-active in <2.1.8 */ {
  opacity: 1;
}

.content-slide-leave,
    .directory-slide-enter-to /* .directory-slide-enter-active in <2.1.8 */ {
  opacity: 0;
}

/* directory Container Styles */
.content-container {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-x: hidden; /* Hide overflow while sliding */
  transition: width 0.3s ease-in-out; /* Added transition for smooth animation */
}

.content-container.collapsed {
  @apply w-full
  @apply ml-[7rem];
}
</style>
