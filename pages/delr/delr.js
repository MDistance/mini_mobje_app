// pages/delr/delr.js
const app = getApp()
const { getLllegalList }  = require('../../api/shortrent/wechat')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delrList:[],
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取用户信息
    that.getStorageUserInfo();
    //获取违章列表
    that.getLllegalLists();

  },

  //获取违章列表
  getLllegalLists:function(e){
    let that = this;
    const user = wx.getStorageSync('userInfo')
    getLllegalList({
      openId : user.openId
    }, {
      success(res) {
       if (res.code == 200) {
       that.setData({
         delrList: res.data
       })
       }
      },
      fail(err) {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('getLllegalLists 服务器异常');
      }
    })
  },

   //缓存中获取user
  getStorageUserInfo(e){
    let that = this;
    const user = wx.getStorageSync('userInfo')
    that.setData({
      userInfo:user
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