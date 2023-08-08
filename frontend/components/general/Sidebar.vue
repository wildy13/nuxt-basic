<template>
  <div class="w-full h-screen bg-slate-200">
    <!-- Hamburger Icon -->
    <div class="hamburger-container" @click="toggleSidebar">
      <div :class="['hamburger-btn', { active: !isSidebarCollapsed }]">
        <span class="hamburger-bar" />
        <span class="hamburger-bar" />
        <span class="hamburger-bar" />
      </div>
    </div>
    <!-- Sidebar Content -->
    <div class="absolute top-10 right-10">
      Login As {{ $auth.user.username }}
    </div>
    <transition name="sidebar-slide">
      <div v-if="!isSidebarCollapsed" class="sidebar">
        <el-menu class="el-menu-vertical-demo menu" @select="handleLogout">
          <el-menu-item class="text-center">
            <NuxtLink to="/dashboard" class="hover:text-green-500">
              <span class="font-bold text-lg">DASHBOARD | ADMIN</span>
            </NuxtLink>
          </el-menu-item>
          <el-menu-item>
            <NuxtLink to="user-management" class="hover:text-green-500">
              <i class="fas fa-user mx-2" />
              <span>User Management</span>
            </NuxtLink>
          </el-menu-item>
          <el-menu-item>
            <NuxtLink to="upload" class="hover:text-green-500">
              <i class="fa fa-file-zipper mx-2" />
              <span>Upload</span>
            </NuxtLink>
          </el-menu-item>
          <el-menu-item>
            <NuxtLink to="content-management" class="hover:text-green-500">
              <i class="fa fa-folder mx-2" />
              <span>Content Management</span>
            </NuxtLink>
          </el-menu-item>
          <el-menu-item index="logout">
            <i class="fa fa-power-off mx-2" />
            <span>Logout</span>
          </el-menu-item>
        </el-menu>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  async asyncData({ store }) {
    // You can also set the isSidebarCollapsed state on server-side rendering
    await store.commit('sidebar/setSidebarCollapsed', true)
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarCollapsed']), // Accessing isSidebarCollapsed from the 'sidebar' module in the store
  },
  methods: {
    ...mapMutations('sidebar', ['setSidebarCollapsed']), // Accessing the setSidebarCollapsed mutation from the 'sidebar' module in the store

    toggleSidebar() {
      this.setSidebarCollapsed(!this.isSidebarCollapsed)
    },

    handleLogout(key, keyPath) {
      if (key === 'logout') {
        localStorage.removeItem('token')
        this.$auth.logout()
      }
    },
  },
}
</script>
