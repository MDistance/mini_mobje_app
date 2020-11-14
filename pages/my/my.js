var app = getApp();
var isLoginSuccess = false;
const {
  wechatLogin
} = require('../../api/shortrent/wechat')
// const { login }  = require('../../api/shortrent/login')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:'',
    customerTel:'',
  },

// 发票管理
delrBtn:function(){
    wx.navigateTo({
      url: '/pages/delr/delr',
    })
 },
 // 违章记录
invoiceManage:function(){
  wx.navigateTo({
    url: '/pages/invoice-management/invoice-management',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.userAuthorized();
  },

  previewHead: function () {
    wx.previewImage({
      current: this.data.userHead,
      urls: [this.data.userHead]
    })
  },

    //查看是否授权
    userAuthorized() {
      let that = this;
      wx.getSetting({
        success: data => {
          if (data.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: data => {
                app.globalData.hasUserInfo = true;
                that.setData({
                  userInfo: data.userInfo,
                  hasUserInfo: true
                })
              }
            })
          } else {
            that.setData({
              hasUserInfo: false
            })
            app.globalData.hasUserInfo = false;
  
          }
        }
      })
    },
    onGetUserInfo(e) {
      let that=this;
      const userInfo = e.detail.userInfo
      console.log(userInfo);
      if (userInfo) {
        that.setData({
          userInfo:userInfo,
          hasUserInfo:true
        })
        //小程序通过wx.login()获取code
        wx.login({
          success: function (login_res) {
            //获取用户信息
            wx.getUserInfo({
              success: function (info_res) {
                // 小程序通过请求发送code到开发者服务器
                wechatLogin({
                  //临时登录凭证
                  code: login_res.code,
                  //用户非敏感信息
                  rawData: info_res.rawData,
                  //签名
                  signature: info_res.signature,
                  //用户敏感信息
                  encrypteData: info_res.encryptedData,
                  iv: info_res.iv //解密算法的向量
                }, {
                  success(res) {
                   if (res.data.code == 200) {
                   //如果登录成功切换全局登录状态
                     app.globalData.hasUserInfo = true;
                     //用户信息保存到缓存
                     wx.setStorageSync('userInfo', res.data.data);
                     
                   }
                  },
                  fail(err) {
                   //如果登录失败切换全局登录状态
                   app.globalData.hasUserInfo = false;
                  }
                })
              }
            })
          }
        })
      }
  
    },
  loginTap: function () {
    var that = this;
    //查看是否授权
    that.userAuthorized();
    if (!isLoginSuccess) {
      wx.showLoading({
        title: '正在登录...',
      })
    }
    if(that.data.hasUserInfo == false){

    }
  },

  tel: function () {
    console.log("tel")
    wx.makePhoneCall({
      phoneNumber: this.data.customerTel 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})