<template>
  <section>
    <form @submit.prevent="onSubmit">
      <h2 class="title">
        Регистрация
      </h2>
      <input
        v-model="email"
        type="text"
        placeholder="Введите Ваш email"
        class="input"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Введите Ваш пароль"
        class="input"
      >
      <button
        type="submit"
      >
        <span>
          <span class="text">Зарегистрироваться</span>
        </span>
      </button>
    </form>
  </section>
</template>

<script>
export default {
  layout: 'todo',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
      if (this.$store.getters.isAuthenticated) {
        this.$router.push('/')
      }
    }
  }
}
</script>
