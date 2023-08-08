export const state = () => ({
  me: {},
})

export const mutations = {
  setMe(state, me) {
    state.me = me
  },
}

export const getters = {
  getMe: (state) => state.me,
}

export const actions = {
  async fetchMe({ commit }) {
    const res = await this.$axios.$get('/api/user/me')
    commit('setMe', res)
  },
}
