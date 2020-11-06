const DEV_NAME = 'https://mobje.top/api' //线上模式
// const DEV_NAME = 'http://172.20.10.2:8081/api' //开发模式

const api = {
  login: DEV_NAME + '/wx/login', //登录
  getAccessToken: DEV_NAME + '/wx/getAccessToken', //
  pushOneUser: DEV_NAME + '/wx/pushOneUser', //发送订阅消息
  getBookingInit: DEV_NAME + '/wx/getBookingInit', //填写预约信息初始化 type 0: 接机送机, 飞机；1：接站送站, 火车；
  getCarModelList: DEV_NAME + '/car/getCarModelList', //获取车型列表
  getBannerList: DEV_NAME + '/banner/getBannerList', //banner列表
  getOpenIdUser: DEV_NAME + '/user/getOpenIdUser',//根据openid获取用户信息
  setBooking: DEV_NAME + '/booking/setBooking',//保存预约信息
  getBookingList: DEV_NAME + '/booking/getBookingList',//获取预约列表
  getOpenIdUser: DEV_NAME + '/user/getOpenIdUser',//根据openId获取用户
  updateUser: DEV_NAME + '/user/updateUser',//修改用户信息
  cancelBooking: DEV_NAME + '/booking/cancelBooking',//取消订单
  updateBooking: DEV_NAME + '/booking/updateBooking',//修改订单
  selectOneOrder: DEV_NAME + '/booking/selectOneOrder',//根据bookingId 获取订单信息
  saveInvoice: DEV_NAME + '/invoice/saveInvoice',//发票保存
  getTypeInvoiceInfo: DEV_NAME + '/invoice/getTypeInvoiceInfo',//根据openid type 获取最新的发票信息
  timeOut: DEV_NAME + '/booking/timeOut',//判断订单是否超过4小时
  getDateTimes: DEV_NAME + '/wx/getDateTimes',//获取日期与时间
  wxLocation: DEV_NAME + '/wx/wxLocation',//获取定位位置
  getCustomerTel: DEV_NAME + '/wx/getCustomerTel',//获取客服电话
}

module.exports = api;