<template>
  <div />
</template>

<script>
export default {
  name: 'IndexPage',
  beforeMount () {
    const menuList = this.$store.state.user.menuList
    if (menuList.length > 0) {
      let path = menuList[0]?.path
      if (menuList[0]?.children?.length > 0) {
        path = menuList[0].children[0].path
      }
      this.$router.push({
        path
      })
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
