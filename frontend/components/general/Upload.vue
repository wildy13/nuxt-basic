<template>
  <div class="">
    <Transition name="upload-slide">
      <div class="mt-16">
        <el-upload
          ref="upload"
          :class="['upload-container', { active: !isSidebarCollapsed }]"
          name="zip"
          accept="application/x-zip-compressed"
          :data="row"
          class="upload-demo"
          :action="pathUpload + $auth.user.id"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">
            select file
          </el-button>
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
          >
            upload to server
          </el-button>
          <div slot="tip" class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </el-upload>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  async asyncData({ store }) {
    // You can also set the isSidebarCollapsed state on server-side rendering
    await store.commit('sidebar/setSidebarCollapsed', true)
  },
  data() {
    return {
      fileList: [],
      row: {},
      pathUpload: 'http://localhost:5001/api/upload/',
    }
  },

  computed: {
    ...mapGetters('sidebar', ['isSidebarCollapsed']),
  },

  methods: {
    ...mapMutations('sidebar', ['setSidebarCollapsed']), // Accessing the setSidebarCollapsed mutation from the 'sidebar' module in the store
    toggleSidebar() {
      this.setSidebarCollapsed(!this.isSidebarCollapsed)
    },

    submitUpload() {
      try {
        this.$refs.upload.submit()
      } catch (error) {
        console.log(error)
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 1, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    },
    beforeAvatarUpload(file) {
      this.zipUrl = file
    },
    handleAvatarSuccess(res, file) {
      this.zipUrl = URL.createObjectURL(file.raw)
    },
  },
}
</script>

<style>
/* upload Slide Animation */
.upload-slide-enter-active,
.upload-slide-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.upload-slide-enter,
.upload-slide-leave-to /* .upload-slide-leave-active in <2.1.8 */ {
  opacity: 1;
}

.upload-slide-leave,
.upload-slide-enter-to /* .upload-slide-enter-active in <2.1.8 */ {
  opacity: 0;
}

/* Upload Container Styles */
.upload-container {
  flex: 1;
  padding: 20px;
  max-width: calc(
    100% - 240px
  ); /* Set the maximum width to prevent overlap with the sidebar */
  transition: transform 0.3s ease; /* Added transition for smooth animation */
  /* Add the following styles to move the upload-container when sidebar is active */
  transform-origin: left;
  transform: translateX(0);
}

.upload-container.active {
  flex: 0 0 70%; /* Adjust the width to your preference */
  /* Move the upload-container to the right when sidebar is active */
  transform: translateX(240px);
}
</style>
