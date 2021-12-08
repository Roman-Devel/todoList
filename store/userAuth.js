export const state = () => ({
  token: null
})

export const mutations = {
  SET_TOKEN (state, token) {
    sessionStorage.setItem('token', token)
    state.token = token
  },
  USER_LOGOUT (state) {
    sessionStorage.clear()
    state.token = null
  }
}

export const actions = {
  async SIGN_IN ({ commit }, payload) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$post(url, { ...payload, returnSecureToken: true })
      commit('SET_TOKEN', data.idToken)
    } catch (e) {
      console.log(e.message)
    }
  },
  async SIGN_UP ({ commit }, { email, password }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$post(url, { email, password, returnSecureToken: true })
      commit('SET_TOKEN', data.idToken)
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.token
  }
}
