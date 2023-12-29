<template>
  <div class='ship-writing-content'>
    <div class='ship-writing-top-bg'>
      <van-nav-bar
        class='pt30'
        title='船舶作业写实'
        :fixed='false'
        :left-arrow='false'
        @click-left='leftBack'
      />
      <div class='ship-writing-search'>
        <van-tabs :before-change='beforeChange' v-model='active'
                  @change='tabChange($event)'
                  title-active-color='#3675E9' color='#3675E9'>
          <van-tab title='在港船舶'></van-tab>
          <van-tab title='历史船舶'></van-tab>
        </van-tabs>
        <div class='bar-search'>
          <!--          <van-search @search="onSearch" v-model="value" placeholder="请输入搜索关键词" right-icon='search' left-icon='null'/>-->
          <van-search @clear='onClear' @search='onSearch' v-model='value' placeholder='中英文船名,呼号,IMO' left-icon=''>
            <template #right-icon>
              <div @click='onSearch'>
                <van-icon name='search' size='0.5rem' />
              </div>
            </template>
          </van-search>
        </div>
      </div>
    </div>


    <div class='ship-writing-body pl15 pr15 pt5'>
      <van-pull-refresh v-model='refreshing' @refresh='onRefresh'>
        <van-list
          v-if='list.length > 0'
          :loading='loading'
          :finished='finished'
          finished-text='没有更多了'
          @load='onLoad'
        >
          <div class='list-item-container' v-for='(item, index) in list' :key='index' :title='item'>

            <div class='flex align-items-center list-item-title p10 justify-content-between'>
              <div class='flex align-items-center'>
                <van-button plain type='info' class='mr5 tip-btn' size='small'
                            :color='item.impExp==="E"?"#D58836":"#2CBCAE"'>
                  {{ item.impExpName }}
                </van-button>
                <span class='fs16 pl5'>{{ item.shipNameZh }}</span>
              </div>
              <div style='color: #337AF3' class='lastBerthName'>
                <span class='fs14 pl5'>{{ item.berth }}</span>
              </div>
            </div>
            <div class='list-item-body'>
              <van-cell :value='item.rtb'>
                <template #title>
                  靠泊时间:
                </template>
              </van-cell>
              <van-cell :value='item.rtd'>
                <template #title>
                  离港时间:
                </template>
              </van-cell>
              <van-cell :value='item.cargoTypeName'>
                <template #title>
                  货类:
                </template>
              </van-cell>
              <van-cell :value='item.ton'>
                <template #title>
                  总吨:
                </template>
              </van-cell>
            </div>
            <div class='list-item-btn flex justify-content-end'>
              <!--              <van-button plain type='info' class='mr5 action-btn' size='normal'><span class='vh'>删</span>删除<span class='vh'>除</span></van-button>-->
              <van-button @click='goToDetails(item)' type='info' color='#3675E9'
                          class='mr5 action-btn'>作业写实
              </van-button>
            </div>
          </div>
        </van-list>
        <van-empty v-if='list.length === 0' description='暂无数据' />
      </van-pull-refresh>

    </div>
  </div>

</template>

<script>

import { ShipVoyagePage } from 'api/ship-real-writing-api'

export default {
  name: 'real-writing-ship-list',
  data() {
    return {
      list: [],
      pages: 0,
      loading: false,
      refreshing: false,
      finished: false,
      areaId: '',
      areaName: '',
      cardType: '',
      active: 2,
      value: '',
      keyword: '',
      isChangeFlag: true,
      qureyFrom: {
        forecastStatus: 'Y',
        pages: 0,
        size: 5,
        current: 0,
        keyword: ''
      }
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    beforeChange() {
      return this.isChangeFlag
    },
    tabChange(e) {
      console.log(e)
      if (e === 0) {
        this.qureyFrom.forecastStatus = 'Y'
      } else if (e === 1) {
        this.qureyFrom.forecastStatus = 'L'
      }
      this.onRefresh()
    },
    onClear() {
      this.qureyFrom.keyword = this.value
      this.onRefresh()
    },
    onSearch() {
      console.log(this.value)
      this.qureyFrom.keyword = this.value
      this.onRefresh()
    },
    leftBack() {
      this.$router.back()
    },
    goToDetails(item) {
      this.$router.replace({
        path: '/real-writing-record-list',
        query: {
          shipId: item.shipId,
          shipNameZh: item.shipNameZh,
          backUrl: '/real-writing-ship-list'
        }
      })
    },
    onLoad() {
      // this.pages = this.pages + 1
      this.qureyFrom.current += 1
      this.loadData()
    },
    onRefresh() {
      this.finished = false
      this.list = []
      // this.pages = 1
      this.qureyFrom.current = 1
      this.loadData()
    },
    loadData() {
      this.loading = true
      ShipVoyagePage({
        ...this.qureyFrom
      }).then(({ data }) => {
        this.list = [...this.list, ...data.records]
        this.loading = false
        this.refreshing = false
        if (this.list.length === data.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar .van-icon {
  color: red !important;
}

.van-nav-bar {
  background: #FFFFFF !important;
}

.info {
  font-size: 18px;
  padding-left: 20px;
}

.ship-writing-content {
  width: 100%;
  height: 100vh;
  overflow: auto;
  //padding-top: 204px;
  //height: calc(100vh - 204px);
  background-color: #F8F8F8;
}

.ship-writing-top-bg {
  //position: fixed;
  //top: 0;
  //left: 0;
  //z-index: 99;
  width: 100%;
  height: 390px;
  //background-image: url("../../../../static/img/bg-history-page.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.bar-search {
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 15px;
}

.ship-writing-body {
  height: calc(100vh - 200px);
  overflow: auto;
  margin-top: -205px;
}

.btn__search {
  color: #FFFFFF;
  background: #337AF3;
  border-radius: 20px;
  padding: 0 20px;
}

.van-search__content {
  background: rgba(255, 255, 255, 0.3);
}

.lastBerthName {
  padding: 3px;
  border: 1px solid #337AF3;
  border-radius: 5px;
  text-align: center;
}

//.history-page__container .van-search .van-cell .van-field__left-icon {
//  color: #ffffff;
//}

.list-item-container {
  background-color: #FFFFFF;
  margin-bottom: 15px;
  //padding: 15px;
  border-radius: 5px;

  .list-item-title {
    border-bottom: 1px solid #ececec;
  }
}

.van-search {
  .van-cell {
    line-height: 30px;
    padding: 0;
  }

  border-radius: 5px;
  padding: 5px;
}

.van-cell__title {
  color: #969799;
  flex: unset;
  padding-right: 5px;
  //width: 100px;
}

.van-cell__value {
  color: #323233;
  text-align: left;
}

.van-cell--clickable {
  .van-cell__value {
    color: #337AF3 !important;
    text-align: left;
  }
}

.van-cell::after {
  border-bottom: unset;
}

.list-item-body {
  .van-cell {
    padding: 5px 15px 5px 15px;
  }

  padding-bottom: 10px;
}

.line {
  height: 1px;
  border-bottom: 1px #ececec dashed;
  margin: 5px 15px 0px 15px;
}

.van-button--info {
  border-radius: 6px;
}

.list-item-btn {
  padding-bottom: 10px;
  padding-right: 10px;
}

.van-button.action-btn {
  height: 36px !important;
}

.van-button.tip-btn {
  height: 24px !important;
  //min-height: 26px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;

  .van-button__content {
    //width: 100px !important;
    //overflow: hidden;
    //text-overflow: ellipsis;
    //white-space: nowrap;
  }
}

.biz-type {
  padding: 5px;
  border: 1px solid #D58836;
  border-radius: 5px;
  max-width: 100px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #D58836;
  font-size: 13px;
}

</style>

