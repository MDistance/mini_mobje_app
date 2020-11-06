// pages/invoice/invoice.js
//获取应用实例
var app = getApp()
const API = require('../../utils/api.js');
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
    type: null,
    invoiceName: '',
    invoiceTel: '',
    invoiceEmail: '',


    //企业
    invoiceEnterprise: '',
    invoiceAccount: '',
    invoiceBankName: '',
    invoiceAddress: '',
    invoiceEnterpriseNo: '',
    orderNo:null,

    



  },

  //选中发票类型
  radioChange: function(e) {

    console.log('value值为：', e.detail.value)
    if (e.detail.value == 0) {
      var type = 0;
      this.setData({
        personalHide: true,
        enterpriseHide: false,
        type: 0,
      })
      this.initSetData(type)
    } else if (e.detail.value == 1) {
      var type = 1;
      this.setData({
        enterpriseHide: true,
        personalHide: false,
        type: 1,
      })
      this.initSetData(type)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.initValidate();
    this.setData({
      type: 0,
      bookingId: options.bookingId,
      orderNo: options.orderNo
    })
    this.initSetData(0);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  initSetData:function(e){
    var that = this;
     //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    wx.request({
      url: API.getTypeInvoiceInfo,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type: e,
        wxUserId: user.userId,
      },
      success: function (res) {
        
        if (res.data.code == 200) {
          if (that.data.type == 0){
            that.setData({
              invoiceName: res.data.data.name,
              invoiceTel: res.data.data.phone,
              invoiceEmail: res.data.data.email,
            
            })
          }else{
            that.setData({
              invoiceName: res.data.data.name,
              invoiceTel: res.data.data.phone,
              invoiceEmail: res.data.data.email,
              invoiceEnterprise: res.data.data.enterprise,
              invoiceAccount: res.data.data.account,
              invoiceBankName: res.data.data.bankName,
              invoiceAddress: res.data.data.address,
              invoiceEnterpriseNo: res.data.data.enterpriseNo,
            
            })
          }
           

        } else {
          wx.showModal({
            content: "网络超时",
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
  },


  //调用验证函数
  submitForm: function(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (this.data.type == 0) {
      if (params.invoiceName == "" || params.invoiceName == null) {
        wx.showModal({
          content: '请填写姓名',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceTel == "" || params.invoiceTel == null) {
        wx.showModal({
          content: '请填写手机号',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceTel) {
        if (!(/^1[34578]\d{9}$/.test(params.invoiceTel))) {
          wx.showModal({
            content: '请正确填写手机号',
            showCancel: false,
          })
          return false;
        }
      }
      if (params.invoiceEmail == "" || params.invoiceEmail == null) {
        wx.showModal({
          content: '请填写电子邮箱',
          showCancel: false,
        })
        return false;

      }
      // if (params.invoiceEmail ) {
      //   if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(params.invoiceTel))) {
      //     wx.showModal({
      //       content: '请正确填写电子邮箱',
      //       showCancel: false,
      //     })
      //     return false;
      //   }

      // }
      //获取缓存里用户信息openid
      var user = wx.getStorageSync("userInfoData");
      if (wx.showLoading) {
        wx.showToast({
          icon: 'loading',
          title: 'Loading',
          mask: true
        })
      };
      wx.request({
        url: API.saveInvoice,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "wxUserId": user.userId,
          "bookingId": this.data.bookingId,
          "phone": params.invoiceTel,
          "orderNo": this.data.orderNo,
          "email": params.invoiceEmail,
          "name": params.invoiceName,
          "type": this.data.type,
        },
        success: function (res) {
          if (res.data.code == 200) {
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
        fail: function (error) {
          console.log(error);

        }
      })
    }else{
      if (params.invoiceEnterprise == "" || params.invoiceEnterprise == null) {
        wx.showModal({
          content: '请填写企业名称',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceTel == "" || params.invoiceTel == null) {
        wx.showModal({
          content: '请填写手机号',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceTel) {
        if (!(/^1[34578]\d{9}$/.test(params.invoiceTel))) {
          wx.showModal({
            content: '请正确填写手机号',
            showCancel: false,
          })
          return false;
        }
      }
      if (params.invoiceAccount == "" || params.invoiceAccount == null) {
        wx.showModal({
          content: '请填写账号',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceBankName == "" || params.invoiceBankName == null) {
        wx.showModal({
          content: '请填写开户行',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceAddress == "" || params.invoiceAddress == null) {
        wx.showModal({
          content: '请填写地址',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceEnterpriseNo == "" || params.invoiceEnterpriseNo == null) {
        wx.showModal({
          content: '请填写纳税号',
          showCancel: false,
        })
        return false;
      }
      if (params.invoiceEmail == "" || params.invoiceEmail == null) {
        wx.showModal({
          content: '请填写电子邮箱',
          showCancel: false,
        })
        return false;

      }
      // if (params.invoiceEmail) {
      //   reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      //   if (!reg.test(params.invoiceTel)) {
      //     wx.showModal({
      //       content: '请正确填写电子邮箱',
      //       showCancel: false,
      //     })
      //     return false;
      //   }

      // }
      //获取缓存里用户信息openid
      var user = wx.getStorageSync("userInfoData");
      if (wx.showLoading) {
        wx.showToast({
          icon: 'loading',
          title: 'Loading',
          mask: true
        })
      };
      wx.request({
        url: API.saveInvoice,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "wxUserId": user.userId,
          "bookingId": this.data.bookingId,
          "phone": params.invoiceTel,
          "enterprise": params.invoiceEnterprise,
          "enterpriseNo": params.invoiceEnterpriseNo,
          "address": params.invoiceAddress,
          "bankName": params.invoiceBankName,
          "email": params.invoiceEmail,
          "account": params.invoiceAccount,
          "type": this.data.type,
        },
        success: function (res) {
          if (res.data.code == 200) {
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
        fail: function (error) {
          console.log(error);

        }
      })
    }
   
  }
})