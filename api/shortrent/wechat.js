const { DEV_NAME, req } = require('../../utils/api.js')

//登录接口
export function wechatLogin(data, {success, fail}){
  req({
    url:DEV_NAME + '/wechat/login',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}

//用户认证接口
export function wxUserIdentityNumberAuth(data, {success, fail}){
  req({
    url:DEV_NAME + '/wechat/wxUserIdentityNumberAuth',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}

//根据城市编码获取上门送车价格
export function getDeliveryPrice(data, {success, fail}){
  req({
    url:DEV_NAME + '/dict/getDeliveryPrice',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}
//获取违章列表
export function getLllegalList(data, {success, fail}){
  req({
    url:DEV_NAME + '/lllegal/getLllegalList',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}