const { DEV_NAME, req } = require('../../utils/api.js')

export function outletsList(data,{success, fail}){
  req({
    url:DEV_NAME + '/outletsManage/getAreaInfobyCity',
    method:'GET',
    data,
    success,
    fail
  })
}
export function outletsArea(data,{success, fail}){
  req({
    url:DEV_NAME + '/outletsManage/getOutletsbyAreaCode',
    method:'GET',
    data,
    success,
    fail
  })
}
export function getoutInfo(data,{success, fail}){
  req({
    url:DEV_NAME + '/outletsManage/getoutletsInfobyid',
    method:'GET',
    data,
    success,
    fail
  })
}