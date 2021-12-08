<template>
  <section>
    <form @submit.prevent="HandleSubmit">
      <h2>Регистрация</h2>
      <input
        v-model="email"
        type="text"
        placeholder="Введите Ваш email"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Введите Ваш пароль"
      >
      <button
        type="submit"
      >
        Зарегистрироваться
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
    async HandleSubmit () {
      await this.$store.dispatch('userAuth/SIGN_UP', {
        email: this.email,
        password: this.password
      })
      if (this.$store.getters['userAuth/isAuthenticated']) {
        this.$router.push('/todo')
      }
    }
  }
}
</script>
