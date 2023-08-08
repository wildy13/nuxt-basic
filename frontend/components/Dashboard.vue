<template>
  <div class="w-full h-screen bg-slate-200">
    <!-- Text Container -->
    <transition name="text-slide">
      <div :class="['text-container', { active: !isSidebarCollapsed }]">
        <div class="mt-16">
          <!-- Card Container -->
          <div :class="['card-container', { active: !isSidebarCollapsed }]">
            <el-card shadow="hover" class="card">
              <div>
                <span class="title">Total Users</span>
                <div>{{ usersData.length }}</div>
              </div>
            </el-card>

            <el-card shadow="hover" class="card">
              <div slot="header" class="card-header">Card 2</div>
              <div class="card-content">
                <!-- Content for Card 2 -->
              </div>
            </el-card>

            <el-card shadow="hover" class="card">
              <div slot="header" class="card-header">Card 3</div>
              <div class="card-content">
                <!-- Content for Card 3 -->
              </div>
            </el-card>

            <el-card shadow="hover" class="card">
              <div slot="header" class="card-header">Card 4</div>
              <div class="card-content">
                <!-- Content for Card 4 -->
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </transition>

    <!-- Footer -->
    <footer class="footer">
      &copy; 2023 Agraindo Jaya Sena, All right reserved. | Privacy Policy
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  async asyncData({ store }) {
    // You can also set the isSidebarCollapsed state on server-side rendering
    await store.commit('sidebar/setSidebarCollapsed', true)
  },
  data() {
    return {
      defaultActive: 'dashboard',
      isTableVisible: true,
      visible: false,
    }
  },

  computed: {
    ...mapState('users', ['loading']),
    ...mapGetters('sidebar', ['isSidebarCollapsed']),
    ...mapGetters({
      loading: ['users/getLoading'],
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
    ...mapActions('users', ['fetchUsers', 'fetchEdit']),
    ...mapMutations('sidebar', ['setSidebarCollapsed']), // Accessing the setSidebarCollapsed mutation from the 'sidebar' module in the store
    toggleSidebar() {
      this.setSidebarCollapsed(!this.isSidebarCollapsed)
    },
  },
}
</script>

<style>
/* Hamburger Button Styles */
.hamburger-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000; /* Add a higher z-index value to bring it to the front */
}

.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease; /* Added transition for smooth animation */
}

.hamburger-bar {
  width: 30px;
  height: 3px;
  background-color: #000;
  margin-bottom: 5px;
  transition: transform 0.3s ease; /* Added transition for smooth animation */
}

.hamburger-btn.active .hamburger-bar:nth-child(1) {
  transform: translateY(6px) rotate(-45deg);
}

.hamburger-btn.active .hamburger-bar:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .hamburger-bar:nth-child(3) {
  transform: translateY(-6px) rotate(45deg);
}

/* Sidebar Slide Animation */
/* Sidebar Slide Animation */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.sidebar-slide-enter,
.sidebar-slide-leave-to /* .sidebar-slide-leave-active in <2.1.8 */ {
  transform: translateX(-100%);
}

.sidebar-slide-leave,
.sidebar-slide-enter-to /* .sidebar-slide-enter-active in <2.1.8 */ {
  transform: translateX(0);
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  background-color: #fff;
}

/* el menu */
.menu {
  margin-top: 70px;
}

/* el-menu Styles */
.el-menu {
  background-color: transparent;
}

/* Transparent hover effect */
.el-menu-item:hover {
  background-color: transparent;
  @apply text-green-500;
}

/* Text Container Styles */
.text-container {
  flex: 1;
  padding: 20px;
  max-width: calc(
    100% - 240px
  ); /* Set the maximum width to prevent overlap with the sidebar */
  transition: transform 0.3s ease; /* Added transition for smooth animation */
  /* Add the following styles to move the text-container when sidebar is active */
  transform-origin: left;
  transform: translateX(0);
}

.text-container.active {
  flex: 0 0 70%; /* Adjust the width to your preference */
  /* Move the text-container to the right when sidebar is active */
  transform: translateX(240px);
}

.text-container p {
  font-size: 16px;
}

/* Text Slide Animation */
.text-slide-enter-active,
.text-slide-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.text-slide-enter,
.text-slide-leave-to /* .text-slide-leave-active in <2.1.8 */ {
  opacity: 1;
}

.text-slide-leave,
.text-slide-enter-to /* .text-slide-enter-active in <2.1.8 */ {
  opacity: 0;
}

/* Card Container Styles */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 13rem;
}

.card-container.active {
  margin: 0;
}
/* Card Styles */
.card {
  margin-top: 20px;
  width: calc(
    25% - 10px
  ); /* To have 4 cards in a row with 10px margin between them */
}

/* Footer Styles */
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  text-align: center;
}

/* Title */
.title {
  font-family: 'Josefin Slab', serif;
}

.el-dialog__wrapper {
  width: 100vw;
  height: 100vh;
}

.v-modal {
  width: 100vw;
  height: 100vh;
}
</style>
