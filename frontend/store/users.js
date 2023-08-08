export const state = () => ({
  users: [],
  loading: false,
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  updateList(state, data) {
    state.users.push(data)
  },

  deleteUsers(state, res) {
    res.map((v1) => {
      const index = state.users.findIndex((v2) => v2.id === v1.id)
      state.users.splice(index, 1)
      return true
    })
  },

  updateUsers(state, res) {
    const index = state.users.findIndex((u) => u.id === res.id)
    Object.assign(state.users[index], res)
  },
  changePassword(state, res) {
    state.users = res
  },
}

export const getters = {
  getUsers: (state) => state.users,
  getLoading: (state) => state.loading,
}

export const actions = {
  async createUser({ commit }, payload) {
    const data = await this.$axios.$post(
      'http://localhost:5001/api/user/',
      payload
    )
    commit('updateList', data)
  },

  async fetchUsers({ commit }) {
    const res = await this.$axios.$get('http://localhost:5001/api/user/')
    commit('setUsers', res)
  },

  async fetchDel({ commit }, payload) {
    const res = await this.$axios.$post(
      '/http://localhost:5001api/user/delete',
      payload
    )
    commit('deleteUsers', res)
  },

  async fetchEdit({ commit }, payload) {
    const res = await this.$axios.$put(
      `http://localhost:5001/api/user/${payload.id}`,
      payload
    )
    commit('updateUsers', res)
  },

  async changePassword({ commit }, payload) {
    const res = await this.$axios.$post(
      `http://localhost:5001/api/user/change/${payload.id}`,
      payload
    )
    commit('changePassword', res)
  },
}
