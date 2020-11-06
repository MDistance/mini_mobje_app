var app = getApp();
var isLoginSuccess = false;
// const API = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTitle: '点击头像登录',
    userHead: '/assets/ic_mine_normal.png',
    customerTel:'',
    userRen:'摩捷认证用户',
    userTel:'1800009536'
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
    this.isUserinfo();
    this.getCustomerTel();
    // this.initLoginMsg();
  },
  isUserinfo: function(){
    if (!isLoginSuccess) {
      var user = wx.getStorageSync("userInfo");
      this.setData({
        userTitle: user.nickName,
        userHead: user.avatarUrl
      })
     
    }
  },
  previewHead: function () {
    wx.previewImage({
      current: this.data.userHead,
      urls: [this.data.userHead]
    })
  },

  loginTap: function () {
    var that = this;
    if (!isLoginSuccess) {
      wx.showLoading({
        title: '正在登录...',
      })
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          wx.hideLoading();
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (app.userInfoReadyCallback) {
                  app.userInfoReadyCallback(res)
                }
                that.initLoginMsg();
              },
              fail: res => {
                wx.hideLoading();
                isLoginSuccess = false;
                that.setData({
                  userTitle: '点击登录',
                  userHead: '/images/ic_mine_normal.png'
                })
              }
            })
          }
        }
      })
    }
  },

 

  allOrderTap: function () {
    wx.switchTab({
      url: '../order/order?type=all',
    })
  },

  aboutTap: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  personalTap: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },

  
getCustomerTel: function(e){
  var that = this;
  wx.request({
    // url: API.getCustomerTel,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      console.log(res)
      if (res.data.code == 200) {
        that.setData({
          customerTel:res.data.data.dictValue
        })
      } 
    },
    fail: function (error) {
      console.log(error);

    }
  })
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