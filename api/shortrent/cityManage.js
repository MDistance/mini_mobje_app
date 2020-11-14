const { DEV_NAME, req } = require('../../utils/api.js')

export function cityList({success, fail}){
  req({
    url:DEV_NAME + '/cityManage/getCityInfo',
    method:'GET',
    success,
    fail
  })
}