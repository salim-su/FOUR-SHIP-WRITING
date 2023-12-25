<template>
  <div class='content device-info-content'>
    <div class='flex justify-content-center device-scan' v-if='show&&!loading'>
      <div class='scan-img'>

      </div>
    </div>
    <div class='flex justify-content-center device-scan pt40' v-if='loading'>
      <van-loading />
    </div>

    <div class='flex justify-content-center device-scan flex-column' v-if='!show&&!loading'>
      <van-empty description='暂无预约信息' />
      <div>设备编号:{{ deviceNo }}</div>
    </div>

    <div class='device-info' v-if='show&&!loading'>
      <van-cell-group>
        <van-cell>
          <template #title>
            <span class='custom-title'>设备编号:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ deviceNo ? deviceNo : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>区域:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.apAreaName ? info.ap.apAreaName : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>预约工作内容:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.apContent ? info.ap.apContent : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>预约单位名称:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.apEnt ? info.ap.apEnt : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>预约入场时间:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.apTimeIn ? info.ap.apTimeIn : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>预约类型:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.apTypeName ? info.ap.apTypeName : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>预约负责人:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.directorName ? info.ap.directorName : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>预约负责人联系方式:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.directorPhone ? info.ap.directorPhone : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>身份证号:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.person.vrIdCard ? info.person.vrIdCard : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>姓名:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.person.vrName ? info.person.vrName : '-' }}</span>
          </template>
        </van-cell>

        <van-cell>
          <template #title>
            <span class='custom-title'>电话:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.person.vrPhone ? info.person.vrPhone : '-' }}</span>
          </template>
        </van-cell>

        <van-cell>
          <template #title>
            <span class='custom-title'>审核部门:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.auditDeptName ? info.ap.auditDeptName : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>审核人:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.ap.auditUserName ? info.ap.auditUserName : '-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>登记车辆牌照:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info.vehicle.crNumber ? info.vehicle.crNumber : '-' }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { apInfo } from 'api/user'

export default {
  name: 'apInfo',
  data() {
    return {
      status: '',
      deviceNo: '',
      show: false,
      loading: false,
      info: {
        ap: '',
        person: '',
        vehicle: ''
      }
    }
  },
  mounted() {
    if (this.$route.query.deviceNo) {
      this.deviceNo = this.$route.query.deviceNo
      this.loading = true
      apInfo(this.deviceNo).then(res => {
        // console.log(res?.data)
        // console.log(JSON.stringify(res?.data))
        this.info = res?.data
        this.loading = false
        if (JSON.stringify(res?.data) === '{}') {
          this.show = false
        } else {
          this.show = true
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.content {
  //padding: 20px;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #F6F6F6;
  //padding-top: 50px;
  position: relative;
}

.scan-img {
  margin-top: 50px;
  margin-bottom: 20px;
  background-image: url('../../../static/img/qr-code.png');
  width: 130px;
  height: 130px;
  background-size: cover !important;
}

.van-cell-group {
  background-color: transparent !important;

  .van-cell {
    background-color: transparent !important;
  }
}

.device-scan {
  //height: 35%;
  width: 100%;
  align-items: center;
}

.van-empty {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.device-info {
  padding: 15px 10px 5px 10px;
  //margin-left: -20px;
  //margin-right: -20px;
  //position: absolute;
  //bottom: 0;
  //left: 0;
  width: 100%;
  //height: 65%;
  background-color: #ffffff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
</style>
