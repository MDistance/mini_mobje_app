// pages/chooseOutlets/chooseOutlets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'力旺广场店',
    addressDesc:'上海市崇明区',
    addressPhone:'021-31231212312',
    mainActiveIndex: 0,
    activeId: null,
    netWorkAddress:[{},{}],
    items:[
      {
        // 导航名称
        text: '机场/火车站',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
 
      },
      {
        // 导航名称
        text: '朝阳区',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
      {
        // 导航名称
        text: '朝阳区',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
      {
        // 导航名称
        text: '南关区',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: true,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '杭州',
            id: 2,
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
    ],
  },
  // 搜索
  bindInput: function(e){
    var that = this;
    var url = '../inputtips/index';
    if(e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city){
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.redirectTo({
      url: url
    })
  },
  // 列表nav
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
// 列表右侧nav
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },
  // 返回主页
  toIndexNet:function(){
    this.getOpenerEventChannel().emit('getPickupOutlets', {pickup_outlets:this.data.addressDesc,});
    wx.switchTab({
      url: '/pages/index/index',
    })
},
  // 跳转到网点详情
  toNetworkDetails:function(){
    wx.navigateTo({
      url: '/pages/network-details/network-details',
    })
},

  // 跳转地图
  toMap:function(){
    wx.navigateTo({
      url: '/pages/networkNum/networkNum',
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