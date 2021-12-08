export const actions = {
  async ADD_TODO (_, todo) {
    try {
      const url = `https://testingapp-aade4-default-rtdb.firebaseio.com/todos.json?key=${process.env.VUE_APP_KEY}`
      const data = await this.$axios.$post(url, { title: todo })
      return data.name
    } catch (e) {
      console.log(e.message)
    }
  },
  async LOAD_TODO () {
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
  async REMOVE_TODO (_, id) {
    try {
      const url = `https://testingapp-aade4-default-rtdb.firebaseio.com/todos/${id}.json?key=${process.env.VUE_APP_KEY}`
      await this.$axios.$delete(url)
    } catch (e) {
      console.log(e.message)
    }
  }
}
