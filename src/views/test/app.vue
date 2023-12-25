<template>
  <div id='app'>
    <app-users
      :userList='userList' />
    //前者自定义名称便于子组件调用，后者要传递数据名
  </div>
</template>

<script>
import AppUsers from 'views/test/appUsers'

export default {
  name: 'app',
  data() {
    return {
      userList: ['Henry', 'Bucky', 'Emily']
    }
  },
  components: {
    'app-users': AppUsers
  }
}
</script>

<style scoped>

</style>
