<template>
  <div>
    <Register />
    <section>
      <form @submit.prevent="onAuth">
        <h2 class="title">
          Авторизация
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
            <span class="text">Авторизоваться</span>
          </span>
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
  methods: {
    async onAuth () {
      await this.$store.dispatch('login', {
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
