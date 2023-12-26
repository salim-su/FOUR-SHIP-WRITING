<template>
  <div class='writing-record-submit'>
    <div class='writing-record-top-bg'>
      <van-nav-bar
        class='pt30'
        :title='shipNameZh+cabin+"舱"'
        :fixed='false'
        :left-arrow='true'
        @click-left='leftBack'
      />
    </div>
    <div class='writing-record-submit-body'>
      <van-field
        v-model='log'
        rows='3'
        autosize
        label='日志:'
        type='textarea'
        maxlength='150'
        placeholder='请输入日志'
        show-word-limit
      />

      <!--      <van-field name='uploader' label='图片:'>-->
      <!--        <template #input>-->
      <!--                <van-uploader ref="uploader" :before-read='beforeRead' @click-upload='clickUpload' v-model='fileList' :after-read="afterRead">-->
      <!--                  <van-button size="mini" type="primary" icon="photo" @click="handleClick">上传</van-button>-->
      <!--                </van-uploader>-->


      <!--        </template>-->
      <!--      </van-field>-->

            <van-uploader
              ref='files'
              :disabled='disabled'
              :file-list='fileList'
              :max-count='3'
              :upload-text="'上传'"
              :preview-full-image='false'
              :use-before-read='true'
              accept='image/*'
              :after-read='afterRead'
            >
              <div></div>
            </van-uploader>
            <van-button size='mini' type='primary' icon='photo' @click='handleClick'>上传</van-button>

      <!--      <van-field-->
      <!--        readonly-->
      <!--        label-width='130px'-->
      <!--        clickable-->
      <!--        right-icon='arrow-down'-->
      <!--        name='hatch'-->
      <!--        :value='hatch["dictValue"]'-->
      <!--        label='区域'-->
      <!--        placeholder='请选择区域'-->
      <!--        @click='showHatchPicker = true'-->
      <!--        :rules='[{ required: true}]'-->
      <!--        required-->
      <!--      />-->

      <!--      <input type='file' ref='files'>-->


<!--      <van-button size='mini' type='primary' icon='photo' @click='handleClick'>上传</van-button>-->

      <!--      <input type='file' ref='files'>-->


      <van-popup v-model='showHatchPicker' position='bottom'>
        <van-picker
          show-toolbar
          :columns='hatchColumns'
          value-key='dictValue'
          @confirm='onHatchConfirm'
          @cancel='showHatchPicker = false'
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'

export default {
  name: 'real-writing-submit',
  data() {
    return {
      log: '',
      shipNameZh: '',
      backUrl: '',
      shipId: '',
      cabin: 0,
      showHatchPicker: false,
      hatchColumns: [],
      fileList: [],
      hatch: '',
      hatchSel: '',
      disabled: false
    }
  },
  mounted() {
    this.shipNameZh = this.$route.query.shipNameZh
    this.backUrl = this.$route.query.backUrl
    this.shipId = this.$route.query.shipId
    this.cabin = this.$route.query.cabin
    this.hatchColumns = [
      {
        dictValue: '前',
        dictkey: 'qian'
      },
      {
        dictValue: '后',
        dictkey: 'hou'
      }
    ]
  },
  methods: {
    tes() {
      alert(11)
    },
    handleClick() {
      // alert("salmisu")
      // 手动触发上传事件
      this.showHatchPicker = true

    },
    afterRead(file) {
      // 上传成功后添加到 fileList 数组
      // file.response 包含上传成功后的文件信息
      this.fileList.push(file)
    },
    leftBack() {
      this.$router.replace({
        path: this.backUrl,
        query: {
          shipId: this.shipId,
          shipNameZh: this.shipNameZh,
          cabin: this.cabin
        }
      })
    },
    onHatchConfirm(value) {
      this.hatch = value
      this.hatchSel = value['dictKey']
      this.showHatchPicker = false
      // console.log(this.$refs.files.$refs.input)
      this.$refs.files.$refs.input.click()
    },
    clickUpload() {
      // alert('sususu')
      // Toast('salim')

      // Dialog({ message: '提示' });
      // this.showHatchPicker = true
    },
    beforeRead(file) {
      // this.showHatchPicker = true
      return true
    }
  }
}
</script>

<style scoped lang='less'>
.writing-record-submit-body {
  height: calc(100vh - 150px);
  overflow: auto;
  margin-top: 15px;
  //background-color: #42b983;
  //margin-top: -120px;
}


</style>
