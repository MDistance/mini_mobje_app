// pages/invoice-history/invoice-history.js
const { getList }  = require('../../api/shortrent/receipt')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReceiptHistory();
  },

  // 加载发票历史页面
  getReceiptHistory:function (){
   let that =this;
   const user = wx.getStorageSync('userInfo')
    let param={
      openId:user.openId
    };
      getList(param,{
      success(res){   
        let rultlIST=res.data;
        that.setData({
          invoiceList:rultlIST
        });  
      },
      fail(err){
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('getReceiptHistory 服务器异常');
      }

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