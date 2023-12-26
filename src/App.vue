<template>
  <div id='app'>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang='scss'>
.ship-writing-content,.writing-record-content,.writing-record-submit{
  .van-nav-bar .van-icon{
    color: #000000;
  }
}
.van-step--vertical {
  .van-step__circle-container{
    background-image: url("../static/img/time.svg") !important;
    width: 16px !important;
    height: 16px !important;
    background-size: contain;
  }
  .van-step__circle{
    display: none;
  }
}
.writing-record-content{
  .tips{
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
}
.writing-record-submit{
  .van-field__label{
    width: 60px;
  }
}
</style>
