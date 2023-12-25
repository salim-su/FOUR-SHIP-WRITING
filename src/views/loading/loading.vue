<template>
  <div class='w h flex align-items-center justify-content-center'>
    <van-loading color="#0094ff" />
  </div>
</template>

<script>

export default {
  name: 'loading-ship-real-writing',
  data() {
    return {
      info: ''
    }
  },
  methods: {

  },
  mounted() {
    const token = this.$route.query.token
    const menu = this.$route.query.menu
    localStorage.clear()
    localStorage.setItem('token', token)
    this.$router.replace({ path: menu })
  }
}
</script>

<style scoped lang='less'>

</style>
