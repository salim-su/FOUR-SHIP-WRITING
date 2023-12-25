import { Subject } from 'rxjs'

const qr_sub = new Subject()
window['getQr'] = (data) => {
  let v = String(data)
  if (v) {
    v = v.replaceAll(' ', '')
  }
  state.qr = v
  qr_sub.next(v)
}
window['getqr'] = (data) => {
  let v = String(data)
  if (v) {
    v = v.replaceAll(' ', '')
  }
  state.qr = v
  qr_sub.next(v)
}
const blueList_sub = new Subject()
window['getBlueList'] = (data) => {
  let v = []
  if (data) {
    v = JSON.parse(data)
  }
  state.blueList = v
  blueList_sub.next(v)
}
const loc_sub = new Subject()
window['getLoc'] = (data) => {
  const v = JSON.parse(data)
  state.localInfo = v
  loc_sub.next(v)
}
const bluePrintH5_sub = new Subject()
window['bluePrintH5'] = (data) => {
  bluePrintH5_sub.next(true)
}

window['blueprinth5'] = (data) => {
  bluePrintH5_sub.next(true)
}

const state = {
  qr: '',
  blueList: '',
  localInfo: '',
  bluePrint: ''
}

const mutations = {}

const handle = (code, params) => {
  window.flutter_inappwebview.callHandler(code, params)
}


const actions = {
  qr(context, params) {
    setTimeout(() => {
      try {
        qrCode.postMessage(params)
      } catch (e) {
        console.log(e)
      }
      try {
        toast.postMessage(params)
      } catch (e) {
        console.log(e)
      }
      try {
        handle('qrCode', params)
      } catch (e) {
        console.log(e)
      }
    }, 100)
    return new Promise((resolve, reject) => {
      qr_sub.subscribe((data) => {
        resolve(data)
      })
    })
  },
  blueList({ commit }, params) {
    setTimeout(() => {
      try {
        blueList.postMessage(params)
      } catch (e) {
        console.log(e)
      }
      try {
        handle('blueList', params)
      } catch (e) {
        console.log(e)
      }
    }, 100)
    return new Promise((resolve, reject) => {
      blueList_sub.subscribe((data) => {
        resolve(data)
      })
    })
  },
  bluePrint({ commit }, params) {
    setTimeout(() => {
      try {
        blueprint.postMessage(params)
      } catch (e) {
        console.log(e)
      }
      try {
        bluePrint.postMessage(params)
      } catch (e) {
        console.log(e)
      }
      try {
        handle('bluePrint',params)
      } catch (e) {
        console.log(e)
      }
    }, 100)
    return new Promise((resolve, reject) => {
      bluePrintH5_sub.subscribe((data) => {
        resolve(data)
      })
    })
  },
  localInfo({ commit }, params) {
    setTimeout(() => {
      try {
        localInfo.postMessage(params)
      } catch (e) {
        loc_sub.next({
          'longitude': 0,
          'latitude': 0,
          'timestamp': 0,
          'accuracy': 0,
          'altitude': 0,
          'floor': 0,
          'heading': 0,
          'speed': 0,
          'speed_accuracy': 0,
          'is_mocked': true
        })
      }
    }, 100)
    return new Promise((resolve, reject) => {
      loc_sub.subscribe((data) => {
        resolve(data)
      })
    })
  },
  noAuth({ commit }, params) {
    try {
      noAuth.postMessage(params)
    } catch (e) {
      console.log(e)
    }
    try {
      handle('noAuth',params)
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
