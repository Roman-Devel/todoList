<template>
  <section>
    <h1>
      Error {{ error.statusCode }}
    </h1>

    <nuxt-link to="/">
      Home
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
  section {
    width: 600px;
    margin: 0 auto;
    padding-top: 5rem;
  }

  h1 {
    color: red;
  }
</style>
