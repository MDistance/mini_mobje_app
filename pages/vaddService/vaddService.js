// pages/vaddService/vaddService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '0',
    checked: true,
    isChecked:false
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onChangeSwitch({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
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
  // 我已阅读并同意代码
  checkboxChange: function (e) {
    let  isChecked = e.currentTarget.dataset.checked;
    if  (isChecked  ==  "false"  ||  isChecked == false) {     //即将选中   将其值设为baitrue

      isChecked = true;
    } else {
      isChecked = false;
    }
    this.setData({
      isChecked:  isChecked
    });
  },
  subBtnText:function(){
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail',
    })
  },
  //规则说明
  treaty: function(e){
    wx.navigateTo({
      url: '../reserve/treaty/treaty',
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})