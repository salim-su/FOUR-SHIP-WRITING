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
        :file-list='photoCar'
        :max-count='3'
        accept='image/*'
        :after-read='uploadFilePerson'
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
    <van-button type='primary' @click='subInfo'>提交按钮</van-button>
    <van-button type='primary' @click='listInfo'>列表按钮</van-button>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { ShipRealWriting, ShipRealWritingList } from 'api/ship-real-writing-api'

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
      disabled: false,
      photoCar: [],
      photoIDCar: []
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
    getFileFromBase64(base64URL, filename) {
      var arr = base64URL.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    uploadFilePerson(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      if (/\/(?:jpeg|png)/i.test(file.file.type)) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const img = new Image()
        img.src = file.content
        img.onload = () => {
          const square = 0.3
          const imageWidth = Math.round(square * img.width)
          const imageHeight = Math.round(square * img.height)
          canvas.width = imageWidth
          canvas.height = imageHeight
          context.drawImage(img, 0, 0, imageWidth, imageHeight)
          file.content = canvas.toDataURL(file.file.type, 0.6)
          const name = file.file.name
          file.file = this.getFileFromBase64(file.content, name)
        }
      }
      setTimeout(() => {
        const param = new FormData()
        param.append('file', file.file)
        param.append('code', 'smartgate')
        this.$axios.post('/api/blade-resource/oss/endpoint/put-file-attach', param).then((res) => {
          if (res.status === 200) {
            file.status = 'done'
            file.message = '上传成功'
            this.photoIDCar.push(res.data.data.attachId)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
          this.photoCar.push({
            url: res.data.data.link
            // url: 'https://img01.yzcdn.cn/vant/leaf.jpg'
          })
        })
      }, 1000)
    },
    listInfo() {
      const params = {
        shipId: '123123123',
        cabin: '1'
      }
      ShipRealWritingList(params).then(res => {
        console.log(res)
      })
      // ShipRealWritingList
    },
    subInfo() {
      console.log(this.photoCar)
      console.log(this.photoIDCar)
      // const data = {
      //   shipId: '123123123',
      //   cabin: '1',
      //   log: '我是日志',
      //   attachmentDetails: [
      //     { ossId: '1', hatch: 'qian' },
      //     { ossId: '2', hatch: 'hou' }
      //   ]
      // }
      // console.log(data)
      // ShipRealWriting(data).then(res => {
      //   console.log(res)
      // })
    },
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
