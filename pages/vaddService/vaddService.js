// pages/vaddService/vaddService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '0',
    checked: true,
    isChecked:false,
    username:'',
    userIDNum:'',
    userphone:''
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
    //无忧保障
    onCollageChange: function (event) {
      var that = this;
      var detail = event.detail;
      if (detail.value == true) {
  
        that.setData({
          isCarpooling: detail.value,
          crpooling: 1,
          aircraftPrice: that.data.titlePrice,
          sfje: that.data.payData - that.data.titlePrice,
  
        })
      } else {
        that.setData({
          isCarpooling: detail.value,
          crpooling: 0,
          aircraftPrice: 0,
          sfje: that.data.payData
  
        })
      }
    },
     //基础保障
     onCollageChange: function (event) {
      var that = this;
      var detail = event.detail;
      if (detail.value == true) {
  
        that.setData({
          isCarpooling: detail.value,
          crpooling: 1,
          aircraftPrice: that.data.titlePrice,
          sfje: that.data.payData - that.data.titlePrice,
  
        })
      } else {
        that.setData({
          isCarpooling: detail.value,
          crpooling: 0,
          aircraftPrice: 0,
          sfje: that.data.payData
  
        })
      }
    },
     //整备费
     onCollageChange: function (event) {
      var that = this;
      var detail = event.detail;
      if (detail.value == true) {
  
        that.setData({
          isCarpooling: detail.value,
          crpooling: 1,
          aircraftPrice: that.data.titlePrice,
          sfje: that.data.payData - that.data.titlePrice,
  
        })
      } else {
        that.setData({
          isCarpooling: detail.value,
          crpooling: 0,
          aircraftPrice: 0,
          sfje: that.data.payData
  
        })
      }
    },
     //加油服务费
     onCollageChange: function (event) {
      var that = this;
      var detail = event.detail;
      if (detail.value == true) {
  
        that.setData({
          isCarpooling: detail.value,
          crpooling: 1,
          aircraftPrice: that.data.titlePrice,
          sfje: that.data.payData - that.data.titlePrice,
  
        })
      } else {
        that.setData({
          isCarpooling: detail.value,
          crpooling: 0,
          aircraftPrice: 0,
          sfje: that.data.payData
  
        })
      }
    },
    //调用验证函数
    submitForm: function(e) {
      var that = this;
      console.log('form发生了submit事件，携带的数据为：', e.detail.value)
      const params = e.detail.value
      that.data.form.username = params.name;
      that.data.form.userphone = params.phone;
      that.data.form.userIDNum = params.flightNo;
      that.data.form.city = params.city;
      //校验表单
        if (that.username == "" || that.username == null) {
          wx.showModal({
            content: '请填写用户名',
            showCancel: false,
          })
          return false;
        }
        if (params.userphone == "" || params.userphone == null) {
          wx.showModal({
            content: '请填写手机号',
            showCancel: false,
          })
          return false;
        }
        if (params.userphone) {
          if (!(/^1[34578]\d{9}$/.test(params.userphone))) {
            wx.showModal({
              content: '请正确填写手机号',
              showCancel: false,
            })
            return false;
          }
        }
        if (params.userIDNum == "" || params.userIDNum == null) {
          wx.showModal({
            content: '请填写身份证号',
            showCancel: false,
          })
          return false;
  
        }
        if (that.data.isChecked == false) {
          wx.showModal({
    
            content: '请查看规则说明并勾选',
            showCancel: false
          })
          return false
        }
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
  subBtnText:function(e){
    var that=this
    that.submitForm(e)
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