const { DEV_NAME, req } = require('../../utils/api.js')

//banner列表接口
export function getBannerList(data, {success, fail}){
  req({
    url:DEV_NAME + '/banner/getBannerList',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}