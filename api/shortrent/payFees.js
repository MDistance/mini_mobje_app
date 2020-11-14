const { DEV_NAME, req } = require('../../utils/api.js')

export function supplementaryDetails(data, {success, fail}){
  req({
    url:DEV_NAME + '/order/getSupplementaryDetails',
    method:'GET',
    data,
    success,
    fail
  })
}

export function orderPayMiniProgram(data, {success, fail}){
  req({
    url:DEV_NAME + '/pay/orderPayMiniProgram',
    method:'POST',
    data,
    success,
    fail
  })
}