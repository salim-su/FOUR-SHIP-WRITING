/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

export function transformTypeFault(type) {
  switch (type) {
    case '1':
      return '漏电传感器开路'
    case '2':
      return '漏电传感器短路'
    case '3':
      return 'CT1开路'
    case '4':
      return 'CT1短路'
    case '5':
      return 'CT2开路'
    case '6':
      return 'CT2短路'
    case '7':
      return 'CT3开路'
    case '8':
      return 'CT3短路'
    case '9':
      return 'A相温度传感器短路'
    case '10':
      return 'A相温度传感器断路'
    case '11':
      return 'B相温度传感器短路'
    case '12':
      return 'B相温度传感器断路'
    case '13':
      return 'C相温度传感器短路'
    case '14':
      return 'C相温度传感器断路'
    case '15':
      return 'N相温度传感器短路'
    case '16':
      return 'N相温度传感器断路'
    case '17':
      return 'A相过载'
    case '18':
      return 'B相过载'
    case '19':
      return 'C相过载'
    case '20':
      return '主电A相过压'
    case '21':
      return '主电B相过压'
    case '22':
      return '主电C相过压'
    case '23':
      return '主电A相缺相'
    case '24':
      return '主电B相缺相'
    case '25':
      return '主电C相缺相'
    case '26':
      return '主电A相欠压'
    case '27':
      return '主电B相欠压'
    case '28':
      return '主电C相欠压'
    case '29':
      return '主电错相'
  }
}

export function transformTypeAlarm(type) {
  switch (type) {
    case '1':
      return '漏电报警'
    case '2':
      return 'A相温度报警'
    case '3':
      return 'B相温度报警'
    case '4':
      return 'C相温度报警'
    case '5':
      return 'N相温度报警'
    case '6':
      return '火灾报警'
    case '7':
      return '人体感应报警'
  }
}
