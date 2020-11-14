var app = getApp()
const {
  wxUserIdentityNumberAuth
} = require('../../api/shortrent/wechat')
// const API = require('../../utils/api.js');
// var utilMd5 = require('../../utils/md5.js');  
const {
  orderList,
  cancel,
  authSuccess,
  returnCar
} = require('../../api/shortrent/order')
const {
  formatOrderStatus
} = require('../../utils/util')
Page({
  data: {
    // 验证通过
    verfiy: true,
    // 验证拒绝
    verifyRefuse: true,
    // 验证未通过
    failedValidation: true,
    showContent: false,
    show: false,
    //是否显示showAuthFailed层
    showAuthFailed: false,
    // 顶部菜单切换
    navbar: ['预约中', '租赁中', "已完成", "已取消"],
    // 默认选中菜单
    currentTab: 0,
    index: 0,
    pick_name: "",
    // list数据
    orderAll: [],
    orderOn: [],
    orderFinish: [],
    orderCancel: [],
    trueName: '',
    identityNumber: '',
    phone: '',
    //是否身份证验证：0:未认证;1:已认证;2:认证拒绝;3:姓名与身份证号不符
    checkUserAuth: 0,
 
  },
  formatOrderStatus,
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
    that.allOrder("1,2");
  },
  toNavgiat: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
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
  allOrder: function (orderStatuses) {
    var that = this;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfo");
 
    //todo 正式接入需要判断openId不存在，不获取列表
    if (user !== null && user != "") {
      orderList({
        openId: user.openId,
        orderStatuses
      }, {
        success(res) {
          that.setData({
            orderAll: res.data
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
 
 
  },
  // 表单项内容发生改变的回调
  handleInputChange(event) {
    let type = event.currentTarget.id;
    // console.log(type, event.detail.value);
 
    this.setData({
      [type]: event.detail.value
    })
  },
  // 租赁人认证
  rental: function (e) {
    var that = this
    that.setData({
      show: !that.data.show
    })
  },
  //用户执行认证
  checkUserAuth: function (event) {
    let that = this;
    //获取租赁人姓名
    let renterName = event.currentTarget.dataset['name'];
    //获取租赁人身份证号
    let renterIdentityNumber = event.currentTarget.dataset['on'];
    //获取订单编号
    let orderNo = event.currentTarget.dataset['order'];
    //获取用户认证状态
    wxUserIdentityNumberAuth({
      trueName: renterName,
      IdentityNumber: renterIdentityNumber,
    }, {
      success(res) {
        if (res.code == 200) {
          //未认证
          if (res.data.isAuth == 0) {
            that.setData({
              showAuthFailed: true,
              checkUserAuth: 0
            })
          }
          //已认证
          if (res.data.isAuth == 1) {
            that.setData({
              checkUserAuth: 1
            })
            //认证成功调用订单认证成功API
            authSuccess(orderNo, {
              success(res) {
                that.allOrder('1,2')
              },
              fail(err) {
                wx.showToast({
                  title: '网络超时',
                  icon: 'none',
                  duration: 2000
                })
                console.log('authSuccess服务器异常');
              }
            })
 
          }
          //认证被拒
          if (res.data.isAuth == 2) {
            that.setData({
              showAuthFailed: true,
              checkUserAuth: 2
            })
          }
 
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('wxUserIdentityNumberAuth服务器异常');
      }
    })
 
    console.log(that.data.identityNumber)
  },
 
  onClose() {
    this.setData({
      close: false
    });
  },
  onClose() {
    this.setData({
      show: false,
      showAuthFailed: false
    });
  },
 
  returnCar: function (e) {
    const that = this;
    const orderNo = e.currentTarget.dataset.order;
    wx.showModal({
      title: '提示',
      content: "您确定是否还车？",
      success(res) {
        if (res.confirm) {
          returnCar(orderNo, {
            success() {
              that.allOrder("4,5,6")
              that.setData({
                currentTab: 2
              })
            },
            fail(err) {
              console.error(err);
            }
          })
        }
      }
    })
   
  },
 
 
  //顶部tab切换
  navbarTap: function (e) {
    var that = this;
    switch (e.currentTarget.dataset.idx) {
      case 0:
        that.allOrder("1,2")
        break
      case 1:
        that.allOrder("3")
        break
      case 2:
        that.allOrder("4,5")
        break
      case 3:
        that.allOrder("0,6")
        break
    }
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 补交费用按钮
  payFreeBtn: function () {
    wx.navigateTo({
      url: '/pages/pay-fees/pay-fees',
    })
  },
  //  开具发票按钮
  invoiceBtn: function () {
    wx.navigateTo({
      url: '/pages/invoice/invoice',
    })
  },
  //  支付订单按钮
  orderPayTap: function (e) {
    //获取订单编号
    const orderNo = e.currentTarget.dataset.orderon;
    wx.navigateTo({
      url: '/pages/orderPay/orderPay?orderNo='+orderNo,
    })
  },
  // 修改订单按钮
  changeTap: function () {
    wx.navigateTo({
      url: '/pages/changeOrder/changeOrder',
    })
  },
  // 支付押金按钮
  payDespo: function (e) {
    //获取订单编号
    const orderNo = e.currentTarget.dataset.orderon;
    wx.navigateTo({
      url: '/pages/desposit/desposit?orderNo='+orderNo,
    })
  },
 
  //取消订单按钮
  cancelTap: function (e) {
    const that = this;
    //获取订单编号
    const orderNo = e.currentTarget.dataset.order;
    const payDetailsList = that.data.orderAll
      .find(item => item.orderNo === orderNo)
      .payDetailsList
    //判断是否有支付中的订单
    if (payDetailsList.filter(i => i.status === '1').length > 0) {
      wx.showModal({
        title: '提示',
        content: "订单尚未支付成功，请稍后重试",
        showCancel: false,
      })
      return
    }
 
    //获取订单流水号
    const payDetailsNo = payDetailsList
      .filter(i => i.status === '2')
      .map(i => i.payDetailsOrderNo)
      wx.showModal({
        title: '提示',
        content: "您确定取消订单？",
        success(res) {
          if (res.confirm) {
            cancel({orderNo,payDetailsNo}, {
              success(res) {
                that.allOrder("0")
                that.setData({
                  currentTab: 3
                })
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        }
      })
   
  },
 
  //申请发票
  invoiceTap: function (e) {
    const orderNo = e.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '../invoice/invoice?orderNo='+orderNo,
    })
  },
  
    //费用补交
    payFeesTap: function (e) {
      var that = this;
      var orderNo = e.currentTarget.dataset.orderno;
      wx.navigateTo({
        url: '../pay-fees/pay-fees?orderNo=' + orderNo,
      })
    },
 
 
})
