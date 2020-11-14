const { DEV_NAME, req } = require('../../utils/api.js')

export function getList(data,{success, fail}){
  req({
    url:DEV_NAME + '/receipt/getoutletsInfobyid',
    method:'GET',
    data,
    success,
    fail
  })
}

export function addreceipt(data,{success, fail}){
  req({
    url:DEV_NAME + '/receipt/addReceiptInfo',
    method:'post',
    data,
    success,
    fail
  })
}