// pages/changeOrder/changeOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickup_city:'取车城市',
    pickup_outlets:'取车网点',
    return_city:'还车城市',
    return_outlets:'还车网点',
    home_delivery:'送车上门地点',
    carList:['宝来','大众朗逸','兰博基尼'],
    array: ['长春', '成都', '松原', '延边'],
    backArray: [ '松原', '延边','长春', '成都'],
    index: 0,
    days: ['1天', '2天', '3天', '4天','5天', '6天', '7天', '8天','9天', '10天', '11天'],
    travelTime:'2020-10-20',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    // 送车上门按钮
    onChangeCar(event) {
      this.setData({
        checked: event.detail,
      });
    },
  confirm: function () {
    wx.navigateTo({
      url: '/pages/changeAddService/changeAddService',
    })
    },
    //点击按钮弹出基础价格的详情信息框
modalinput: function () {
  this.setData({
    show: !this.data.show
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