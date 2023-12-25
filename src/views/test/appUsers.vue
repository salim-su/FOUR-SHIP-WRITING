<template>
  <div class='hello'>
    <ul>
      //遍历传递过来的值，然后呈现到页面
      <li v-for='(user,index) in userList' :key='index'>{{ user }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'appUsers',
  props: {
    userList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
