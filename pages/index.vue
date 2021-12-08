<template>
  <div>
    <Register />
    <section>
      <form @submit.prevent="HandleSubmit">
        <h2>Авторизация</h2>
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
          Авторизоваться
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    if (sessionStorage.getItem('token') !== null) {
      this.$store.commit('userAuth/SET_TOKEN', sessionStorage.getItem('token'))
      this.$router.push('/todo')
    }
  },
  methods: {
    async HandleSubmit () {
      await this.$store.dispatch('userAuth/SIGN_IN', {
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
