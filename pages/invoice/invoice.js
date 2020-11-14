// pages/invoice/invoice.js
//获取应用实例
var app = getApp()
const {
  addreceipt
} = require('../../api/shortrent/receipt')
const {
  orderInfo
} = require('../../api/shortrent/order')
import WxValidate from '../../utils/validate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalHide: true,
    enterpriseHide: false,

    invoiceItems: [
      // { value: '0', name: '个人', checked: true },
      {
        value: '0',
        name: '个人',
        checked: true
      },
      {
        value: '1',
        name: '企业'
      },
    ],
    bookingId: null,
    //发票类型
    type: null,
    //发票姓名
    receiptHeadName: '',
    //电话
    receiptHeadPhone: '',
    //订单编号
    orderOn: '',
    //	个人邮箱
    receiptHeadEmail: '',



    //企业
    //	纳税人识别号
    receiptHeadUsernumber: '',
    //	地址
    receiptHeadAddress: '',
    //	开户行名称
    receiptHeadBankName: '',
    //	银行账户
    receiptHeadBankNumber: '',
    //	发票企业名称
    receiptHeadEntname: '',


    orderInfo: [],
  },

  //选中发票类型
  radioChange: function (e) {

    console.log('value值为：', e.detail.value)
    if (e.detail.value == 0) {
      var type = 0;
      this.setData({
        personalHide: true,
        enterpriseHide: false,
        type: 0,
      })

    } else if (e.detail.value == 1) {
      var type = 1;
      this.setData({
        enterpriseHide: true,
        personalHide: false,
        type: 1,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      orderNo: options.orderNo,
      type: 0,
    })
    that.orderInfos(options.orderNo);

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

  },

  //获取订单详情
  orderInfos: function (orderNo) {
    let that = this;
    orderInfo({
      orderNo: orderNo,
    }, {
      success(res) {
        that.setData({
          orderInfo: res.data,
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


  
  //调用验证函数
  submitForm: function(e) {
    let that = this;
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value

    //校验表单
    if (that.data.type == 0) {
     let isTrue= that.checkePersonal(params)
      if(isTrue == true){
      if (wx.showLoading) {
        wx.showToast({
          icon: 'loading',
          title: 'Loading',
          mask: true
        })
      };
    //发票个人部分
    let paramDate={
      orderOn: that.data.orderInfo.orderNo, //订单编号
      receiptAmt:that.data.orderInfo.orderAmt, //发票金额
      receiptHeadPhone: params.receiptHeadPhone,
      receiptHeadEmail: params.receiptHeadEmail,
      receiptHeadName: params.receiptHeadName,
      receiptType: '0',  //发票类型 0 个人 1 企业
      receiptStatus:'0', //发票状态   1 已开发票 0未开发票
    };
    addreceipt(paramDate,{
      success(res){   
          if (res.code == 200) {
            wx.showToast({
              title: '发票申请成功!',
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/order/order?currentTab=2',
                  })
                }, 1000);
              }
            })

        } else {
          wx.showToast({
            title: '网络故障，请重试!',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/order/order?currentTab=2',
                })
              }, 1000);
            }
          })
        }
      },
      fail(err){
        console.log(err)
      }

    })
  }
    
    }else{
      let isTrue = that.checkeEnterprise(params)
      if(isTrue == true){
        if (wx.showLoading) {
          wx.showToast({
            icon: 'loading',
            title: 'Loading',
            mask: true
          })
        };
        let paramList={
          orderOn: that.data.orderInfo.orderNo,  //订单编号
          receiptAmt:that.data.orderInfo.orderAmt,    // 发票金额
          receiptHeadPhone: params.receiptHeadPhone,
          receiptHeadEntname: params.receiptHeadEntname,
          receiptHeadUsernumber: params.receiptHeadUsernumber,
          receiptHeadAddress: params.receiptHeadAddress,
          receiptHeadBankName: params.receiptHeadBankName,
          receiptHeadEmail: params.receiptHeadEmail,
          receiptHeadBankNumber: params.receiptHeadBankNumber,
          receiptType:that.data.type,  //发票类型 0 个人 1 企业
          receiptStatus:'0', //发票状态  1 已开发票 0未开发票
        };
        addreceipt(paramList,{
          success(res){   
            console.log(res)
            if (res.code == 200) {
              wx.showToast({
                title: '发票申请成功!',
                duration: 1000,
                success: function () {
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/order/order?currentTab=2',
                    })
                  }, 1000);
                }
              })
  
          } else {
            wx.showToast({
              title: '网络故障，请重试!',
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/order/order?currentTab=2',
                  })
                }, 1000);
              }
            })
          }
          },
          fail(err){
            console.log(err)
          }
    
        })
      }
     
    }
   
  },
  //个人字段校验
  checkePersonal: function (e) {
    if (e.receiptHeadName == "" || e.receiptHeadName == null) {
      wx.showModal({
        content: '请填写姓名',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadPhone == "" || e.receiptHeadPhone == null) {
      wx.showModal({
        content: '请填写手机号',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadEmail == "" || e.receiptHeadEmail == null) {
      wx.showModal({
        content: '请填写电子邮箱',
        showCancel: false,
      })
      return false;
    }
    return true;
  },

  //企业字段校验
  checkeEnterprise:function(e){
    if (e.receiptHeadEntname == "" || e.receiptHeadEntname == null) {
      wx.showModal({
        content: '请填写企业名称',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadPhone == "" || e.receiptHeadPhone == null) {
      wx.showModal({
        content: '请填写手机号',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadBankNumber == "" || e.receiptHeadBankNumber == null) {
      wx.showModal({
        content: '请填写银行账号',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadBankName == "" || e.receiptHeadBankName == null) {
      wx.showModal({
        content: '请填写开户行',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadAddress == "" || e.receiptHeadAddress == null) {
      wx.showModal({
        content: '请填写地址',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadUsernumber == "" || e.receiptHeadUsernumber == null) {
      wx.showModal({
        content: '请填写税号',
        showCancel: false,
      })
      return false;
    }
    if (e.receiptHeadEmail == "" || e.receiptHeadEmail == null) {
      wx.showModal({
        content: '请填写电子邮箱',
        showCancel: false,
      })
      return false;
    }
    return true;
  }

})