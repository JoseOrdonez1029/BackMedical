import { createStore } from 'vuex'

const store = createStore({
  state: {
    Token: {
      ejemplo: 'holi',
    },
    User: {
      ejemplo: 'holi2',
    },
  },
  mutations: {
    updateTokenAndUser(state, { token, user }) {
      state.Token = token
      state.User = user
    },
  },
})
export default store
