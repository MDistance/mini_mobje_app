const { DEV_NAME, req } = require('../../utils/api.js')

//增值服务列表接口
export function getAddedList(data, {success, fail}){
  req({
    url:DEV_NAME + '/added/getAddedList',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}

  //保障服务列表接口
export function getInsuranceList(data, {success, fail}){
  req({
    url:DEV_NAME + '/insurance/getInsuranceList',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}
//获取押金金额
export function getAmt(data,{success, fail}){
  req({
    url:DEV_NAME + '/despositManage/getdespositRuiesAmt',
    method:'GET',
    data,
    success,
    fail
  })
}


