export const state = () => ({
  category: [],
})

export const mutations = {
  SET_CATEGORY(state, data) {
    state.category = data
  },
  SET_CREATE_CATEGORY(state, data) {
    state.category.push(data)
  },
}

export const getters = {
  allCategory: (state) => state.category,
}

export const actions = {
  async getAllCategory(context) {
    const data = await this.$axios.$get('http://localhost:5001/api/category/')
    context.commit('SET_CATEGORY', data)
  },
  async createCategory(context, payload) {
    const data = await this.$axios.$post(
      `http://localhost:5001/api/category/${payload.id}`,
      payload
    )
    context.commit('SET_CREATE_CATEGORY', data)
  },
}
