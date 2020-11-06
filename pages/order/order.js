
var app = getApp()
// const API = require('../../utils/api.js');
// var utilMd5 = require('../../utils/md5.js');  
Page({
  data: {
    // 验证通过
    verfiy:true,
    // 验证拒绝
    verifyRefuse:true,
    // 验证未通过
    failedValidation:true,
    showContent:false,
    show: false,
    // 顶部菜单切换
    navbar: ['预约中', '租赁中', "已完成", "已取消"],
    // 默认选中菜单
    currentTab: 0,
    index: 0,
    pick_name: "",
    // list数据
    orderAll: [{
      
    }],
    orderOn:[{}],
    orderFinish:[{}],
    orderCancel:[{}],

  },

  // 初始化加载
  onLoad: function (options) {
    var that = this;
    // if (options.currentTab){
    //   that.setData({
    //     currentTab: options.currentTab
    //   })
    //   that.finishOrder()
    // }else{
     

    // }
    that.allOrder();
  },
  toNavgiat:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })

  },

  //全部订单list
  allOrder: function () {
    var that = this;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    var list = []
    wx.request({
      // url: API.getBookingList,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        state: 0,
        openId: user.openId
      },
      success: function (res) {

        if (res.data.code == 200) {

          list.push(res.data.data)
          that.setData({
            orderAll: list[0]
          })


        } else {

          console.log('服务器异常');
        }
      },
      fail: function (error) {
        console.log(error);

      }
    })

  },
  // 租赁人认证
  rental:function(){
    var that=this
    that.setData({
      show: !that.data.show
    })
  },
  verify:function(){

  },
  onClose() {
    this.setData({ close: false });
  },
  onClose() {
    this.setData({ show: false });
  },
  //待出行订单list
  onOrder: function () {
    var that = this;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    var list = []
    wx.request({
      // url: API.getBookingList,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        state: 1,
        openId: user.openId
      },
      success: function (res) {

        if (res.data.code == 200) {

          list.push(res.data.data)
          that.setData({
            orderOn: list[0]
          })


        } else {

          console.log('服务器异常');
        }
      },
      fail: function (error) {
        console.log(error);

      }
    })

  },
  //已完成订单list
  finishOrder: function () {
    var that = this;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    var list = []
    wx.request({
      // url: API.getBookingList,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        state: 2,
        openId: user.openId
      },
      success: function (res) {

        if (res.data.code == 200) {

          list.push(res.data.data)
          that.setData({
            orderFinish: list[0]
          })


        } else {

          console.log('服务器异常');
        }
      },
      fail: function (error) {
        console.log(error);

      }
    })

  },


  //取消订单list
  cancelOrder: function () {
    var that = this;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    var list = []
   
    wx.request({
      // url: API.getBookingList,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        state: 3,
        openId: user.openId,
        sessionKey: user.sessionKey,
      },
      success: function (res) {
        if (res.data.code == 200) {

          list.push(res.data.data)
          that.setData({
            orderCancel: list[0]
          })

        } else {

          console.log('服务器异常');
        }
      },
      fail: function (error) {
        console.log(error);

      }
    })

  },


  //顶部tab切换
  navbarTap: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.idx)
    switch (e.currentTarget.dataset.idx) {
      case 0:
        that.allOrder()
        break
      case 1:
        that.onOrder()
        break
      case 2:
        that.finishOrder()
        break
      case 3:
        that.cancelOrder()
        break
    }
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
<<<<<<< HEAD
// 补交费用按钮
  payFreeBtn:function(){
    wx.navigateTo({
      url: '/pages/pay-fees/pay-fees',
    })
   },
  //  开具发票按钮
   invoiceBtn:function(){
    wx.navigateTo({
      url: '/pages/invoice-management/invoice-management',
    })
   },
  //  支付订单按钮
=======
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
  orderPayTap:function(){
   wx.navigateTo({
     url: '/pages/orderPay/orderPay',
   })
  },
<<<<<<< HEAD
  // 修改订单按钮
=======
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
  changeTap:function(){
   wx.navigateTo({
     url: '/pages/changeOrder/changeOrder',
   })
  },
<<<<<<< HEAD
  // 支付押金按钮
=======
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
  payDespo:function(){
   wx.navigateTo({
     url: '/pages/desposit/desposit',
   })
  },
<<<<<<< HEAD
  // 申请结束按钮
  toEnd:function (e) {
    var that = this;
    var id = e.currentTarget.dataset.bookingid;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    wx.showModal({
      title: '提示',
      content: '是否结束订单',
      cancelColor: 'cancelColor',
      success(res) {
        if (res.confirm) {
          if (id) {
            wx.request({
              // url: API.cancelBooking,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                bookingId: id,
                openId: user.openId,
                sessionKey: user.sessionKey
              },
              success: function (res) {
                if (res.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: res.data.data,
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                    that.allOrder()
                    that.onOrder()
                    that.finishOrder()
                    that.cancelOrder()
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                  })
                } 
              },
              fail: function (error) {
                wx.showModal({
                  title: '提示',
                  content: "网络超时",
                  showCancel: false,
                })
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })
  },
=======
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
  //取消按钮
  cancelTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.bookingid;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      cancelColor: 'cancelColor',
      success(res) {
        if (res.confirm) {
          if (id) {
            wx.request({
              // url: API.cancelBooking,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                bookingId: id,
                openId: user.openId,
                sessionKey: user.sessionKey
              },
              success: function (res) {
                if (res.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: res.data.data,
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                    that.allOrder()
                    that.onOrder()
                    that.finishOrder()
                    that.cancelOrder()
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                  })
                } 
              },
              fail: function (error) {
                wx.showModal({
                  title: '提示',
                  content: "网络超时",
                  showCancel: false,
                })
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })
  },

  //修改订单
  updateTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.bookingid;
    var type = e.currentTarget.dataset.type;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    wx.request({
      // url: API.timeOut,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        bookingId: id,
        openId: user.openId
      },
      success: function (res) {
        if (res.data.code == 300) {
          wx.showModal({
            title: '提示',
            content: '订单超过4小时不可修改!',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                that.allOrder()
                that.onOrder()
                that.finishOrder()
                that.cancelOrder()
              }
            }
          })

        } else if (res.data.code == 200) {
          wx.navigateTo({
            url: '../reserve/edit/edit?type=' + type + '&bookingId=' + id,
          })
        } 

      },
      fail: function (error) {
        wx.showModal({
          title: '提示',
          content: "网络超时",
          showCancel: false,
        })
      }
    })
   
  },
  //申请发票
  invoiceTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.bookingid;
    var type = e.currentTarget.dataset.type;
    var orderNo = e.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '../invoice/invoice?bookingId=' + id + '&orderNo=' + orderNo,
    })
  },


})