// const DEV_NAME = 'https://mobje.top/api' //线上模式
// const DEV_NAME = 'http://127.0.0.1:8080/api' //开发模式
// const PHOTO_NAME = 'http://127.0.0.1:8080' //开发模式
const DEV_NAME = 'http://192.168.0.182:8080/api' //开发模式
const PHOTO_NAME = 'http://192.168.0.182:8080' //开发模式
module.exports = {
  DEV_NAME,PHOTO_NAME,
  req(option){
    const opt = {}
    Object.assign(opt, option)
    opt.success = function(res){
      option.success(res.data)
    }
    wx.request(opt)
  }
};