// pages/orderDetail/orderDetail.js
const { orderInfo }  = require('../../api/shortrent/order')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:'10002020111100012',
    allPrice:43242,
  },
  changeBtn:function(){
    wx.navigateTo({
      url: '/pages/changeOrder/changeOrder',
    })
  },
  onSubmit:function(){
    let that=this
    wx.navigateTo({
      url: '/pages/orderPay/orderPay',
      events:{
        getCarType:({car_type,car_series,carUrl,price})=>{
          that.setData({
            car_type:car_type,
            car_series:car_series,
            carUrl:carUrl,
            allPrice:price
          });
          console.log(car_type,car_series,carUrl)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPagePrice', {
              price:that.data.allPrice,
            })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    orderInfo({orderNo:this.data.orderNo},{
      success(res){
        let data = {};
        Object.assign(data,res.data);

        data.payStatus = res.data.payDetailsList.find(item => item.type === 1).status;
        that.setData(data);
      },
      fail(err){
        console.error(err);
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