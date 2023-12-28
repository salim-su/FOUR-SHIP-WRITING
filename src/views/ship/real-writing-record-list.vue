<template>
  <div class='writing-record-content posr'>
    <div class='fl-btn flex align-items-center justify-content-center' @click='goWriteSubmit'>
      <van-icon name='plus' size='0.6rem' color='#fff' />
    </div>
    <div class='writing-record-top-bg'>
      <van-nav-bar
        class='pt30'
        :title='shipNameZh'
        :fixed='false'
        :left-arrow='true'
        @click-left='leftBack'
      />
      <div class='writing-record-tags'>
        <van-tabs title-active-color='#3675E9' color='#3675E9' @change='tabChange($event)' v-model='active'>
          <van-tab :key='index' v-for='index in [1,2,3,4,5,6,7,8,9]' :title="index+'舱'">
          </van-tab>
        </van-tabs>
      </div>
      <!--      <van-uploader v-model='fileList' :deletable='false' />-->

    </div>
    <div class='writing-record-body'>

      <div class='flex justify-content-center' v-if='loading'>
        <van-loading type='spinner' />
      </div>

      <div>
        <van-empty description="暂无数据" v-if='realWritingList.length===0'/>
      </div>

      <van-steps direction='vertical' :active='100' active-color='#38f' v-if='realWritingList.length'>
        <template v-for='(item,index) in realWritingList'>
          <van-step :key='index'>
            <div class='writing-record-title flex justify-content-between'>

              <div class='left'>
                <div class='left-time mb5'>{{ item.updateTime }}</div>
                <div class='left-name mb5'>{{ item.updateUserName }}</div>
              </div>
              <div class='right pr10'>
                <van-icon class='mr15' name='edit' size='0.5rem' />
                <van-icon name='delete-o' size='0.5rem' />
                <!--              <van-button type="primary" size="mini">编辑</van-button>-->
                <!--              <van-button type="primary" size="mini">删除</van-button>-->
              </div>
            </div>
            <div class='writing-record-img w flex flex-wrap'>
              <template
                v-for='(items) in item.attachmentDetails'>
                <van-image
                  width='48%'
                  height='120'
                  :src='items.url'
                  class='mb5 posr'
                  @click='showImg(items.url)'
                >
                  <template v-slot:error></template>
                  <template v-slot:default>
                    <!--                  <div class='tips'>asd</div>-->
                    <div class='tips'>{{ items.hatchName }}</div>
                  </template>
                </van-image>
                <div class='ge' style='width: 2%;'></div>
              </template>
            </div>
            <div class='writing-record-remark mt5'>
            <span>
              {{ item.log }}
            </span>
            </div>
          </van-step>
        </template>
      </van-steps>

    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { ShipRealWritingList } from 'api/ship-real-writing-api'

export default {
  name: 'real-writing-record-list',
  data() {
    return {
      shipId: '',
      shipNameZh: '',
      backUrl: '',
      loading: false,
      fileList: [],
      realWritingList: [],
      cabin: 0, // 舱号
      active: 0 // 选中
    }
  },
  mounted() {
    this.shipId = this.$route.query.shipId
    this.shipNameZh = this.$route.query.shipNameZh
    if (this.$route.query.backUrl) {
      this.backUrl = this.$route.query.backUrl
    }
    if (this.$route.query.cabin) {
      this.active = this.$route.query.cabin - 1
    }
    this.loadData()
    // setTimeout(res => {
    //   this.fileList = [
    //     { url: 'https://img01.yzcdn.cn/vant/cat.jpeg' },
    //     { url: 'https://img01.yzcdn.cn/vant/cat.jpeg' },
    //     { url: 'https://img01.yzcdn.cn/vant/cat.jpeg' }
    //   ]
    // }, 100)
    // this.onLoad()
    // setTimeout(res=>{
    //   this.active = 6
    // },5000)
  },
  methods: {
    loadData() {
      const parmas = {
        cabin: this.active + 1,
        shipId: this.shipId
      }
      // this.loading = true
      ShipRealWritingList(parmas).then(res => {
        this.realWritingList = res['data']
        // this.loading = false
      })
    },
    showImg(item) {
      ImagePreview({
        images: [
          item
        ]
      })
    },
    tabChange(e) {
      alert("ss")
      this.loadData()
    },
    leftBack() {
      this.$router.replace({ path: this.backUrl })
    },
    goWriteSubmit() {
      this.cabin = this.active + 1
      console.log(this.cabin)
      console.log(this.shipId)
      this.$router.replace({
        path: '/real-writing-submit',
        query: {
          shipId: this.shipId,
          shipNameZh: this.shipNameZh,
          cabin: this.cabin,
          backUrl: '/real-writing-record-list'
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>

.van-nav-bar {
  background: #FFFFFF !important;
}

.writing-record-content {
  width: 100%;
  height: 100vh;
  overflow: auto;
  //padding-top: 204px;
  //height: calc(100vh - 204px);
  background-color: #F8F8F8;
}

.writing-record-top-bg {
  //position: fixed;
  //top: 0;
  //left: 0;
  //z-index: 99;
  width: 100%;
  //height: 390px;
  //background-image: url("../../../../static/img/bg-history-page.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.writing-record-body {
  height: calc(100vh - 150px);
  overflow: auto;
  margin-top: 15px;
  //margin-top: -120px;
}

.van-step__circle-container {

}

.fl-btn {
  position: absolute;
  bottom: 50px;
  right: 30px;
  width: 40px;
  height: 40px;
  background-color: #3675E9;
  border-radius: 50%;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  z-index: 9;
  //line-height: 40px;
}
</style>

