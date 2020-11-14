// pages/pay-fees/pay-fees.js
const BigNumber = require('bignumber.js');
const { supplementaryDetails,orderPayMiniProgram } = require('../../api/shortrent/payFees')
const { orderInfo } = require('../../api/shortrent/order')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    payOrderNo:'',
    supplementaryDetailsList:[],
    data:[],
    orderNo:'',
    orderInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    supplementaryDetails({orderNo:options.orderNo},{
      success(res){
        let data = {}
        Object.assign(data, res.data)
        data.total = res.data.supplementaryDetailsList.map(item => item.amt * 100).reduce((sum, x) => {
          return sum.plus(x)
        }, new BigNumber("0.00")).toNumber()
        that.setData(data)
        that.setData({
          data:data,
          orderNo:options.orderNo,
        })
      },
      fail(err){
        console.error(err);
      }
    })
    //获取订单详细
    that.orderInfos(options.orderNo)

  }, 
  //调起支付
  sendPay: function (res) {
    let that = this;
    //获取openid
    const user = wx.getStorageSync('userInfo')
    //获取订单价格
    const price = that.data.data.total / 100;
    //获取时间
    let myDate = new Date(); //获取系统当前时间
    let time = that.dateFtt("yyyyMMddhhmmss", myDate);  //格式化时间
    //获取补交流水号
    const payDetailsOrderNo = that.data.orderInfo.payDetailsList
      .find(item => item.type === 3)
      .payDetailsOrderNo
    orderPayMiniProgram({
      openId:user.openId,
      orderAmount:price,
      orderFrom:'SHR_MINI_PROGRAM_FRONT',
      orderNo:that.data.orderNo,
      orderTime:time,
      payAmount:price,
      productName:'订单补交费用',
      remark:'',
      trxNo:payDetailsOrderNo,
      trxType:'3'

    }, {
      success(res) {
        console.log(res)
        wx.requestPayment(
          {
            'timeStamp': res.data.timeStamp1,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package1,
            'signType': 'MD5',
            'paySign': res.data.sign,
            'success': function (res) {
               console.log('success')
              },
            'fail': function (res) {
               console.log('支付失败！')
               wx.showModal({
                title: '提示',
                content: '支付失败,请重试'
            });
              },
            'complete': function (res) {
              console.log('支付完成');
              var url = that.data.url;
              console.log('get url', url)
              if (res.errMsg == 'requestPayment:ok') {
                  wx.showModal({
                      title: '提示',
                      content: '充值成功'
                  });
                  if (url) {
                      setTimeout(function () {
                          wx.redirectTo({
                              url: '/pages' + url
                          });
                      }, 2000)
                  } else {
                      setTimeout(() => {
                          wx.navigateBack()
                      }, 2000)
                  }
              }
              return;
              }
          }) 
      },
      fail(err) {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('服务器异常');
      }
    })
    
  },


  //时间格式化
  dateFtt:function(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if(/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
},


  orderInfos:function(orderNo){
    let that = this;
    orderInfo({
      orderNo:orderNo,
    }, {
      success(res) {
       that.setData({
         orderInfo:res.data
       })
      },
      fail(err) {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('orderInfo 服务器异常');
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