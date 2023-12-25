<template>
  <div>
    <van-tabbar :border="false" @change="handleChange"
                class="tabbar"
                fixed
                route
                v-model="active">
      <van-tabbar-item :key="index" :replace="true" :to="item.to" v-for="(item, index) in data">
        <template #icon="props">
          <van-icon :name="props.active?item.icon.active:item.icon.inactive" class-prefix="my-icon"/>
        </template>
        {{ item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    name: 'TabBar',
    props: {
      defaultActive: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        active: this.defaultActive
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('change', value)
        // if (value === 1) {
        //   console.log(11111)
        //   this.active = 0
        //   this.$router.replace('/add-select')
        // }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .van-tabbar-item{
    color: #CDCDCD !important;
  }
  .van-tabbar-item--active {
    color: #4369D6 !important;
  }

  .van-tabbar{
    height: 60px !important;
  }

</style>
