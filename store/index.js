export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  logout (state) {
    state.token = null
  }
}

export const actions = {
  async login ({ commit }, payload) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$post(url, { ...payload, returnSecureToken: true })
      commit('setToken', data.idToken)
    } catch (e) {
      console.log(e.message)
    }
  },
  async register ({ commit }, { email, password }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$post(url, { email, password, returnSecureToken: true })
      commit('setToken', data.idToken)
    } catch (e) {
      console.log(e.message)
    }
  },
  async add (_, todo) {
    try {
      const url = `https://testingapp-aade4-default-rtdb.firebaseio.com/todos.json?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$post(url, { title: todo })
      return data.name
    } catch (e) {
      console.log(e.message)
    }
  },
  async load () {
    try {
      const url = `https://testingapp-aade4-default-rtdb.firebaseio.com/todos.json?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$get(url)

      if (data) {
        return Object.keys(data).map(key => ({ ...data[key], id: key }))
      }
      return data
    } catch (e) {
      console.log(e.message)
    }
  },
  async remove (_, id) {
    try {
      const url = `https://testingapp-aade4-default-rtdb.firebaseio.com/todos/${id}.json?key=${process.env.VUE_APP_KEY}`
      await this.$axios.$delete(url)
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const getters = {
  token: state => state.token,
  isAuthenticated (_, getters) {
    return !!getters.token
  }
}
