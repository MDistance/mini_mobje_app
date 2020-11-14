const { DEV_NAME, req } = require('../../utils/api.js')

export function orderList(data, {success, fail}){
  req({
    url:DEV_NAME + '/order/list',
    method:'GET',
    data,
    success,
    fail
  })
}

export function orderInfo(data, {success, fail}){
  req({
    url:DEV_NAME + '/order/info',
    method:'GET',
    data,
    success,
    fail
  })
}

export function authSuccess(data, {success, fail}){
  req({
    url:DEV_NAME + '/order/auth',
    method:'POST',
    data,
    success,
    fail
  })
}

export function cancel(data, {success, fail}){
  req({
    url:DEV_NAME + '/order/cancel',
    method:'POST',
    data,
    success,
    fail
  })
}

export function returnCar(data, {success, fail}){
  req({
    url:DEV_NAME + '/order/returnCar',
    method:'POST',
    data,
    success,
    fail
  })
}