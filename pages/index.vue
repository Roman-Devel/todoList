<template>
  <section>
    <nav>
      <a href="#" @click.prevent="logout">
        Logout
      </a>
    </nav>
    <form @submit.prevent="onSubmit()">
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
            @click="remove(toDo.id)"
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
  fetch ({ store, redirect }) {
    if (!store.getters.isAuthenticated) {
      redirect('/login')
    }
  },
  async mounted () {
    this.todos = await this.$store.dispatch('load')
  },
  methods: {
    async onSubmit () {
      const data = await this.$store.dispatch('add', this.todo)
      this.todos.push({
        id: data,
        title: this.todo
      })
      this.todo = ''
    },
    async remove (id) {
      await this.$store.dispatch('remove', id)
      this.todos = this.todos.filter(item => item.id !== id)
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
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
