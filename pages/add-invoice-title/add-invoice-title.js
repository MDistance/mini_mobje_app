// pages/add-invoice-title/add-invoice-title.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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