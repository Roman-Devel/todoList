<template>
  <section>
    <nav>
      <button @click.prevent="HandleLogout">
        Logout
      </button>
    </nav>
    <form @submit.prevent="HandleSubmit">
      <input
        v-model="todo"
        type="text"
        placeholder="Введите заметку"
      >
      <button
        type="submit"
      >
        <span>
          <span class="text">Добавить</span>
        </span>
      </button>
    </form>
    <template v-if="todos">
      <ul>
        <li
          v-for="toDo in todos"
          :key="toDo.id"
        >
          {{ toDo.title }}
          <button
            @click="HandleRemove(toDo.id)"
          >
            Удалить
          </button>
        </li>
      </ul>
    </template>
  </section>
</template>

<script>
export default {
  data () {
    return {
      todos: [],
      todo: ''
    }
  },
  async mounted () {
    if (sessionStorage.getItem('token') !== null) {
      this.$store.commit('userAuth/SET_TOKEN', sessionStorage.getItem('token'))
    } else {
      this.$router.push('/')
    }
    this.todos = await this.$store.dispatch('userTodo/LOAD_TODO')
  },
  methods: {
    async HandleSubmit () {
      const data = await this.$store.dispatch('userTodo/ADD_TODO', this.todo)
      this.todos.push({
        id: data,
        title: this.todo
      })
      this.todo = ''
    },
    async HandleRemove (id) {
      await this.$store.dispatch('userTodo/REMOVE_TODO', id)
      this.todos = this.todos.filter(item => item.id !== id)
    },
    HandleLogout () {
      this.$store.commit('userAuth/USER_LOGOUT')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  nav {
    margin-bottom: 50px;
    font-size: 25px;
    border: 1px solid;
    text-align: center;
  }
  ul {
    margin-top: 1rem;
  }
  li {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
  }
</style>
