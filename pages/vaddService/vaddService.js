//获取应用实例
const app = getApp()
const { default: BigNumber } = require('bignumber.js')
const { getAddedList, getInsuranceList, getAmt } = require('../../api/shortrent/added')

const {
  wxUserIdentityNumberAuth
} = require('../../api/shortrent/wechat')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '0',
    checked: false,
    isChecked: false,
    //真实姓名
    trueName: '',
    //身份证
    identityNumber: '',
    //手机号
    phone: '',
    //城市编码-todo 现在是死值 需要动态传参 @孟婷婷
    cityCode: '000582',
    insuranceExplain: false,//租车保障展示弹窗
    addedExplain: false,//增值服务展示弹窗
    //是否身份证验证：0:未认证;1:已认证;2:认证拒绝;3:姓名与身份证号不符
    checkUserAuth: 0,
    //增值服务集合
    addedList: [],
    addedAmt: 0,
    addedIdList:[],
    //保障服务集合
    insuranceList: [],
    insuranceAmt: 0,
    insuranceIdList:[],
    //押金金额
    ruiesAmt: null,
    price: 0,//已选金额
    days: 2,
    orderAmt: 0
  },
  //根据cityCode获取保障列表
  getInsuranceLists: function (e) {
    let that = this
    getInsuranceList({
      cityCode: that.data.cityCode,
    }, {
      success(res) {
        if (res.code == 200) {
          that.setData({
            insuranceList: res.data.map(item => {
              item.checked = false;
              return item;
            })
          })
          console.log(res)
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('getInsuranceList服务器异常');
      }
    })
  },
  //根据cityCode获取增值服务列表
  addedLists: function (e) {
    let that = this;
    getAddedList({
      cityCode: that.data.cityCode,
    }, {
      success(res) {
        if (res.code == 200) {
          that.setData({
            addedList: res.data.map(item => {
              item.checked = false;
              return item;
            })
          })
          console.log(res.data);
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络超时',
          icon: 'none',
          duration: 2000
        })
        console.log('getAddedList服务器异常');
      }
    })
  },
  // 租车保障弹窗
  insuranceExplain(e) {
    // this.getInsuranceLists(this.data.insuranceList[event.detail.index].insuranceId)
    // const index=this.getInsuranceLists(this.data.insuranceList[e.currentTarget.dataset.insuranceId])
    this.setData({
      insuranceExplain: !this.data.insuranceExplain
    });
  },
  // 增值服务弹窗
  addedExplain(e) {
    
    // this.addedLists(this.data.addedList[event.detail.index].addedId)
    // this.addedLists(this.data.addedList[e.currentTarget.dataset.addedId])
    this.setData({
      addedExplain: !this.data.addedExplain
    })
   
  },
  // 租车保障switch按钮
  onChangeSwitchInsuranceList(e) {
    let insuranceList = this.data.insuranceList
    insuranceList[e.currentTarget.dataset.index].checked = !insuranceList[e.currentTarget.dataset.index].checked
    this.setData({
      insuranceList
    })
    this.setInsuranceAmt()
  },
  setInsuranceAmt() {
    let insuranceAmt = this.data.insuranceList
      .filter(item => item.checked)
      .map(item => item.insurancePrice)
      .reduce((sum, item) => {
        return sum.plus(new BigNumber(item).multipliedBy(this.data.days))
      }, new BigNumber(0)).toFixed(2);
    this.setData({
      insuranceAmt
    })
    this.setPrice()
  },
  // 增值服务switch按钮
  onChangeSwitchAddedList(e) {
    // 需要手动对 checked 状态进行更新
    let addedList = this.data.addedList
    addedList[e.currentTarget.dataset.index].checked = !addedList[e.currentTarget.dataset.index].checked
    this.setData({
      addedList
    })
    this.setAddedAmt()
  },
  setAddedAmt() {
    let addedAmt = this.data.addedList.filter(item => item.checked).map(item => item.addedPrice).reduce((sum, item) => sum.plus(new BigNumber(item)), new BigNumber(0)).toFixed(2)
    this.setData({
      addedAmt
    })
    this.setPrice()
  },
  setPrice() {
    let price = new BigNumber(0);
    price = price.plus(new BigNumber(this.data.price))
      .plus(new BigNumber(this.data.addedAmt))
      .plus(new BigNumber(this.data.insuranceAmt)).toFixed(2)
    this.setData({
      orderAmt: price
    })
  },
  //获取押金金额
  getDespositAmt: function () {
    let that = this;
    let param = {
      cityCode: '000582', //城市编码
      days: 4, // 天数
    }
    getAmt(param, {
      success(res) {
        console.log(res)
        let rultlIST = res.data.ruiesAmt;
        that.setData({
          ruiesAmt: rultlIST
        });
      },
      fail(err) {
        console.log(err)
      }

    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPageVaddService', function ({ allPrice }) {
      that.setData({
        price: allPrice,
      })
      console.log(allPrice)
    })
    //获取增值服务列表
    that.addedLists();
    //获取保障列表
    that.getInsuranceLists();
    //获取押金金额
    that.getDespositAmt();

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

  // 表单项内容发生改变的回调
  handleInputChange(event) {
    let type = event.currentTarget.id;
    // console.log(type, event.detail.value);

    this.setData({
      [type]: event.detail.value
    })
  },
  //用户执行认证
  checkUserAuth: function (e) {
    //checkUserAuth
    let that = this;
    //缓存中获取user
    let user = wx.getStorageSync('userInfo')
    wxUserIdentityNumberAuth({
      userId: user.userId,
      trueName: that.data.trueName,
      IdentityNumber: that.data.identityNumber,
    }, {
      success(res) {
        if (res.code == 200) {
          if (res.data.isAuth != 3) {
            that.setData({
              checkUserAuth: res.data.isAuth
            })
          }
          if (res.data.isAuth == 3) {
            wx.showModal({
              title: '提示',
              content: '姓名与身份证号不符！',
              showCancel: false,
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
  // 我已阅读并同意代码
  checkboxChange: function (e) {
    let isChecked = e.currentTarget.dataset.checked;
    if (isChecked == "false" || isChecked == false) { //即将选中   将其值设为baitrue

      isChecked = true;
    } else {
      isChecked = false;
    }
    this.setData({
      isChecked: isChecked
    });
  },
  // 提交订单按钮
  subBtnText: function (e) {
    let {
      trueName,
      phone,
      identityNumber,
      isChecked
    } = this.data;
    // 用户名为空
    if (!trueName.trim()) {
      // 提示用户
      // alert('xx');
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none'
      })
      return;
    }
    // 身份证为空
    if (!identityNumber.trim()) {
      // 提示用户
      // alert('xx');
      wx.showToast({
        title: '身份证不能为空',
        icon: 'none'
      })
      return;
    }
    // 手机号为空
    if (!phone.trim()) {
      // 提示用户
      // alert('xx');
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    // 手机号格式不正确
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return;
    }
    if (!isChecked) {
      // 提示用户
      // alert('xx');
      wx.showToast({
        title: '请阅读规则说明',
        icon: 'none'
      })
      return;
    }
    const orderGuaranteeIdList = this.data.insuranceList.filter(item => item.checked).map(item => item.insuranceId)
    const orderValueAddedServicesIdList = this.data.addedList.filter(item => item.checked).map(item => item.addedId)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail',
    })
  },
  //规则说明
  treaty: function (e) {
    wx.navigateTo({
      url: './ruleDesc/ruleDesc',
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})