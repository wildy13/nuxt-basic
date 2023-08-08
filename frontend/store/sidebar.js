export const state = () => ({
  isSidebarCollapsed: true,
})

export const getters = {
  isSidebarCollapsed: (state) => state.isSidebarCollapsed,
}

export const mutations = {
  setSidebarCollapsed(state, isCollapsed) {
    state.isSidebarCollapsed = isCollapsed
  },
}
