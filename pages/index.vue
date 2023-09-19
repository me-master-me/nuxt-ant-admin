<template>
  <nuxt />
</template>

<script>
export default {
  name: 'IndexPage',
  beforeMount () {
    this.$router.push('/login')
  }
}
</script>
