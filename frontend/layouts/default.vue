<template>
  <div class="main-wrapper">
    <GeneralSidebar class="sidebar-wrapper" />
    <div class="content-wrapper">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>
<style>
/* Add styles for the main wrapper and content wrapper */
.main-wrapper {
  display: flex;
}

.content-wrapper {
  flex: 1;
  width: 70%;
  /* Add any specific styles for the content wrapper */
}

.sidebar-wrapper {
  width: fit-content;
}
</style>
