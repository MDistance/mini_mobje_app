const { DEV_NAME, req } = require('../../utils/api.js')

export function carTypeList(data, {success, fail}){
  req({
    url:DEV_NAME + '/carInfo/getCarTypeList',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}
export function getCarSeriesSetmeal(data, {success, fail}){
  req({
    url:DEV_NAME + '/carInfo/getCarSeriesSetmeal',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}
export function getCarSeriesList(data, {success, fail}){
  req({
    url:DEV_NAME + '/carInfo/getCarSeriesList',
    method:'POST',
    header: {
      'content-type':'application/x-www-form-urlencoded'
        },
    data,
    success,
    fail
  })
}
