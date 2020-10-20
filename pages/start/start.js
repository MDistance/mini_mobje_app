//login.js
//获取应用实例
var app = getApp();
// const API = require('../../utils/api.js');
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    hasUserInfo: false,
    userInfo: null,
    loginNameBut: "授权登录",
  },

  goToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //登录,跳转首页页
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    })
    // 页面加载时使用用户授权逻辑，弹出确认的框  
    this.userAuthorized()
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })

  },
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      // 1. 小程序通过wx.login()获取code
      wx.login({
        success: function (login_res) {
          //获取用户信息
          wx.getUserInfo({
            success: function (info_res) {
              // 2. 小程序通过wx.request()发送code到开发者服务器
              wx.request({
                url: API.login,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  //临时登录凭证
                  code: login_res.code,
                  //用户非敏感信息
                  rawData: info_res.rawData,
                  //签名
                  signature: info_res.signature,
                  //用户敏感信息
                  encrypteData: info_res.encryptedData,
                  iv: info_res.iv //解密算法的向量
                },
                success: function (res) {
                  console.log("接口请求成功")
                  if (res.data.code == 200) {
                    // 7.小程序存储skey（自定义登录状态）到本地
                    wx.setStorageSync('userInfo', userInfo);
                    wx.setStorageSync('userInfoData', res.data.data);
                    wx.reLaunch({
                      url: '/pages/index/index',
                    });
                  } else {
                    wx.reLaunch({
                      url: '/pages/index/index',
                    });
                    console.log('服务器异常');
                  }
                },
                fail: function (error) {
                  //调用服务端登录接口失败
                  console.log(error);
                  wx.reLaunch({
                    url: '/pages/index/index',
                  });
                }
              })
            }
          })
        }
      })
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  onShow: function () {

  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
});