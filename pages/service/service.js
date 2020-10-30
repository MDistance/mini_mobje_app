// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerTel:'17549643375',
    items: [
			{
				icon: '',
				text: '查询信息',
				path: '/pages/order/list/index'
			}, 
			{
				icon: '',
				text: '预订',
				path: '/pages/address/list/index'
			}, 
			{
				icon: '',
				text: '修改',
				path: '18521708248',
			}, 
			{
				icon: '',
				text: '取消',
				path: '/pages/help/list/index',
      },
      {
				icon: '',
				text: '发票相关',
				path: '/pages/help/list/index',
			},
    ],
    activeNames: ['1']
  },
  phoneCall: function () {
    console.log("phoneCall")
    wx.makePhoneCall({
      phoneNumber: this.data.customerTel 
    })
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  useCarCity(){
  wx.navigateTo({
    url: '/pages/details/details',
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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