// pages/chooseDateTime/chooseDateTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickup_time: '',
    return_time: '',
    startDate: '',
    endDate: '',
    show: true,
    index: 0,
    indexBack: 0,
    allDays: '1',
    formatter(day) {
      if (day.type === 'start') {
        day.bottomInfo = '取车';
      } else if (day.type === 'end') {
        day.bottomInfo = '还车';
      }
      return day;
    },
    pickerHourTextArr: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'], //取车时间数组  
    backerHourTextArr: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'], //还车时间数组  
  },

  // 取车时间
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.operationDate(this.data.startDate, this.data.endDate)
  },
  // 还车时间
  bindBackerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBack: e.detail.value
    })
    this.operationDate(this.data.startDate, this.data.endDate)
  },
  // onClose() {
  //   this.setData({ show: false });
  // },
  onConfirm(event) {
    const [start, end] = event.detail;
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    this.operationDate(startDate, endDate)
  },
  operationDate(startTime, endTime) {
    let allDays = parseInt((endTime - startTime) / 1000 / 60 / 60 / 24)
    if (this.data.indexBack > this.data.index) {
      allDays += 1;
    }
    // const days=
    this.setData({
      show: false,
      startDate: startTime,
      endDate: endTime,
      allDays: allDays
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function ({ startDate, endDate, pickup_time, return_time, allDays }) {
      that.setData({
        index:that.data.pickerHourTextArr.indexOf(pickup_time),
        indexBack:that.data.pickerHourTextArr.indexOf(return_time),
        startDate: startDate,
        endDate: endDate,
        pickup_time: pickup_time,
        return_time: return_time,
        allDays: allDays,
      })
      console.log(pickup_time,return_time)
    })
  },
  // 返回主页
  okBtn: function (e) {
    // var dateTime= e.currentTarget.dataset.data
    this.getOpenerEventChannel().emit('getDate', { 
      start: this.data.startDate, 
      end: this.data.endDate, 
      pickup_time: this.data.pickerHourTextArr[this.data.index], 
      return_time: this.data.backerHourTextArr[this.data.indexBack],
      allDays: this.data.allDays
    });
    wx.switchTab({
      url: '/pages/index/index',
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