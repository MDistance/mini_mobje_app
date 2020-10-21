//获取应用实例
var app = getApp()
// const API = require('../../utils/api.js');
var myDate = new Date();
// const DateUtil = require('../../utils/util.js');

// import WxValidate from '../../utils/validate'

//格式化日期
function formate_data(myDate) {
  let month_add = myDate.getMonth() + 1;
  let d = myDate.getDate();
  if (month_add < 10) {
    month_add = '0' + month_add;
  }
  if (d < 10) {
    d = '0' + d;
  }


  var formate_result = myDate.getFullYear() + '-' +
    month_add + '-' +
    d
  return formate_result;
}

//格式化时间
function formate_time(myDate) {
  let hours = myDate.getHours();
  let min = myDate.getMinutes();
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (min < 10) {
    min = '0' + min;
  }
  var formate_time_res = hours + ':' + min;
  return formate_time_res;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      //出行类型
      type: '',
      //姓名
      name: '',
      //手机号码
      phone: '',
      //航班号/车次
      flightNo: '',
      //城市
      city: '',
      cityCode: '',
      //预约车型id
      modelId: '',
      //预约车型名称
      carModelName: '',
      //乘车人数
      peopleNum: '',
      //出发日期
      travelDate: '',
      //出发时间
      etime: '',
      //是否拼车
      crpooling: 0,
      //是否订阅
      subscribeMsg: 0,
      //出发地点
      startPlace: '',
      //抵达地点
      endPlace: '',
      //订单状态
      state: 0,
      openId: '',
      people: 1,


    },



    //姓名
    name: null,
    //手机号码
    phone: null,
    // //预约车型
    carModel: null,
    carModelName: null,
    //出发地点
    startPlace: '',
    //抵达地点
    endPlace: '',

    travelType: null, //接机类型
    travelTypeName: "", //接机名称 根据initResChange类型判断动态显示
    flightNoNmae: "", //航班号/车次 根据initResChange类型判断动态显示
    cityArray: [], //城市列表
    cityIndex: 0, //城市下标
    cityNull: "请选择城市",
    cityCode: "130000",
    isType: null, //0飞机 1火车
    modelArray: [], //预约车型列表
    modelPriceDict: {},
    modelIndex: 0,
    modelNull: "请选择车型",
    address: '',
    peopleNumNull: "选择乘车人数",
    peopleIndex: 0,
    peopleNum: [{
      name: "1人",
      value: 1,
    }, {
      name: "2人",
      value: 2,
    }, {
      name: "3人",
      value: 3,
    }, {
      name: "4人",
      value: 4,
    }],
    peoNum: null,
    //站点集合
    siteCityDataList: [],
    addressNull: '点击选择位置',
    addressArray: [],
    addressIndex: 0,
    sfje: 0,


    date: formate_data(myDate),
    dateMo: formate_data(myDate),
    travelTime: formate_time(myDate),
    endPlaceStrNull: "点击选择抵达地点",
    startPlaceStrNull: "点击选择出发地点",
    //是否接受拼车：0：否；1：是；
    isCarpooling: false,
    crpooling: 0,
    isSubscribeMsg: false,
    subscribeMsg: 0,
    modelId: null,
    openId: null,
    defaultModel: null, //默认车型
    defaultSite: null, //默认站点
    bookingId: null,
    people: 1,
    isChecked: false,
    siteId: null,
    ifCarModel: false,
    payData: '0.0',
    aircraftPrice: '0',
    titlePrice: '0',
    discountId: null,
    endIsLoaction: false,
    startIsLoaction:false,
    isLoaction:false,

  },

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
  //是否拼车
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
  //是否订阅
  subscribeMsgSwitchChange(event) {
    const detail = event.detail;
    if (event.detail.value == true) {
      this.setData({
        'isSubscribeMsg': detail.value,
        subscribeMsg: 1
      })
      if (detail) {
        this.msgChange();
      }
    } else {
      this.setData({
        'isSubscribeMsg': detail.value,
        subscribeMsg: 0
      })
    }


  },
  msgChange: function (e) {
    var that = this;
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log("消息订阅")
        wx.requestSubscribeMessage({
          tmplIds: ['t-aEoIZ4vWlwDDD2ahJZhsfFZhV8l_7Utwc6ihmr-FU'],
          success(res) {
            if (res['t-aEoIZ4vWlwDDD2ahJZhsfFZhV8l_7Utwc6ihmr-FU'] == "accept") {
              that.setData({
                isSubscribeMsg: true,
                subscribeMsg: 1
              })
            } else {
              that.setData({
                isSubscribeMsg: false,
                subscribeMsg: 0
              })
            }
          },
          fail(res) {
            that.setData({
              isSubscribeMsg: false,
              subscribeMsg: 0
            })
          }

        })
      }
    })
  },


  //改变时间
  bindDateChange: function (e) {
    //获取当前时间
    var date = new Date();
    //时
    var hh = date.getHours();
    //分
    var mm = date.getMinutes();
    var detailDate = e.detail.value;
    var dqDate = this.data.date;
    var timestamp1 = Date.parse(detailDate);
    var timestamp2 = Date.parse(dqDate);
    //判断是否大于今日
    if ((timestamp1 - timestamp2) > 0) {
      this.setData({
        date: e.detail.value,
        travelTime: '01:00'
      })
    } else {
      this.setData({
        date: e.detail.value,
      })
      this.setDateTimes();
    }

  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      travelTime: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    //把传过来的出行类型赋值给data
    this.setData({
      travelType: options.travelType,
      openId:user.openId
    })
    this.data.form.endPlace = this.data.defaultSite;
    // this.initReserveData();
    this.initResChange();
    this.setDateTimes();
    this.initPlaceDateP();
    this.initData();
    this.initDiscount(options);
    this.initUserInfo();
    this.initValidate();



  },

  //初始化时间
  setDateTimes: function (e) {
    var that = this;
    wx.request({
      url: API.getDateTimes,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 200) {

          that.setData({
            dateMo: res.data.data.wxDate,
            travelTime: res.data.data.wxTime,
          })

        }
      },
      fail: function (error) {
        wx.showModal({
          title: '提示',
          content: "时间未加载，网络超时",
          showCancel: false,
        })
      }
    })
  },


  initUserInfo: function (e) {
    var that = this;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    wx.request({
      url: API.getOpenIdUser,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: user.openId
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            name: res.data.data.name,
            phone: res.data.data.phone
          })
        }
      },
      fail: function (error) {
        console.log(error);
      }
    })

  },

  initData: function (e) {
    var that = this;
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        //初始化车型，根据城市与出行类型
        if (that.data.travelType == 0 || that.data.travelType == 1) {
          var modelList = res.data.data.carModelList;
          var list = [];
          for (var i = 0; i < modelList.length; i++) {
            if (modelList[i].code == that.data.cityCode && modelList[i].siteId == that.data.siteId) {
              list.push(modelList[i])
            }
          }
          let modelPriceDict = list.reduce((memo, item) => {
            memo[item.modelId] = item.price;
            return memo;
          }, {})
          that.setData({
            cityArray: res.data.data.cityDataList,
            modelArray: list,
            defaultModel: list[0].name,
            payData: modelPriceDict[list[0].modelId],
            modelPriceDict: modelPriceDict

          })
        } else if (that.data.travelType == 2 || that.data.travelType == 3) {
          var modelList = res.data.data.carModelList;
          var list = [];
          for (var i = 0; i < modelList.length; i++) {
            if (modelList[i].code == that.data.cityCode && modelList[i].siteId == that.data.siteId) {
              list.push(modelList[i])
            }
          }
          let modelPriceDict = list.reduce((memo, item) => {
            memo[item.modelId] = item.price;
            return memo;
          }, {})

          that.setData({
            cityArray: res.data.data.cityDataList,
            modelArray: list,
            defaultModel: list[0].name,
            payData: modelPriceDict[list[0].modelId],
            modelPriceDict: modelPriceDict
          })
        }
      }
    })
  },
  //初始化地点数据 根据出行站点id，城市
  initPlaceDateP: function (e) {
    var that = this;
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        //初始化车型，根据城市与出行类型
        if (that.data.travelType == 0 || that.data.travelType == 1) {
          var addressList = res.data.data.siteList;
          //todo
          var list = [];
          for (var i = 0; i < addressList.length; i++) {
            if (addressList[i].code == that.data.cityCode && addressList[i].siteType == 0) {
              list.push(addressList[i])
            }
          }
          if (that.data.travelType == 1 || that.data.travelType == 3) {
            console.log("zheshi" + list[0].siteName)
            that.setData({
              endPlace: list[0].siteName,
            })
          }
          if (that.data.travelType == 0 || that.data.travelType == 2) {
            that.setData({
              startPlace: list[0].siteName,
            })
          }

          that.setData({
            addressArray: list,
            defaultSite: list[0].siteName,
            siteId: list[0].siteId

          })

        } else if (that.data.travelType == 2 || that.data.travelType == 3) {
          var addressList = res.data.data.siteList;
          var list = [];
          for (var i = 0; i < addressList.length; i++) {
            if (addressList[i].code == that.data.cityCode && addressList[i].siteType == 1) {
              list.push(addressList[i])
            }
          }
          if (that.data.travelType == 1 || that.data.travelType == 3) {
            console.log("zheshi" + list[0].siteName)
            that.setData({
              endPlace: list[0].siteName,
            })
          }
          if (that.data.travelType == 0 || that.data.travelType == 2) {
            that.setData({
              startPlace: list[0].siteName,
            })
          }
          that.setData({

            addressArray: list,
            defaultSite: list[0].siteName,
            siteId: list[0].siteId

          })
        }
        that.initData();

      }
    })
  },

  //页面初始操作
  initResChange: function (e) {

    // 判断用户是否授权了位置信息
    wx.getSetting({
      success: (res) => {
        var statu = res.authSetting;
        //没授权
        if (!statu['scope.userLocation']) {
          //出行类型: 0: 接机；1: 送机；2: 接站；3：送站;
          if (this.data.travelType == 0) {
            //接机服务
            this.setData({
              meetHide: true,
              endMeetHide: false,
              endIsLoaction:true,
              travelTypeName: "接机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "抵达时间",
              isType: 0
            })
          } else if (this.data.travelType == 1) {

            //送机服务
            this.setData({
              travelTypeName: "送机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "出发时间",
              startIsLoaction:true,
              giveHide: false,
              endGiveHide: true,
              isType: 0
            })

          } else if (this.data.travelType == 2) {
            //接站服务
            this.setData({
              meetHide: true,
              endMeetHide: false,
              endIsLoaction:true,
              travelTypeName: "接站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "抵达时间",
              isType: 1
            })

          } else if (this.data.travelType == 3) {
            //送站服务
            this.setData({
              giveHide: false,
              endGiveHide: true,
              startIsLoaction:true,
              travelTypeName: "送站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "出发时间",
              isType: 1
            })
          }
        } else {
          this.setData({
            isLoaction:true
          })
          //出行类型: 0: 接机；1: 送机；2: 接站；3：送站;
          if (this.data.travelType == 0) {
            //接机服务
            this.setData({
              meetHide: true,
              endMeetHide: true,
              travelTypeName: "接机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "抵达时间",
              isType: 0
            })
          } else if (this.data.travelType == 1) {

            //送机服务
            this.setData({
              travelTypeName: "送机服务",
              flightNoNmae: "航班号码",

              travelTimeName: "出发时间",
              giveHide: true,
              endGiveHide: true,
              isType: 0
            })

          } else if (this.data.travelType == 2) {
            //接站服务
            this.setData({
              meetHide: true,
              endMeetHide: true,
              travelTypeName: "接站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "抵达时间",
              isType: 1
            })

          } else if (this.data.travelType == 3) {
            //送站服务
            this.setData({
              giveHide: true,
              endGiveHide: true,
              travelTypeName: "送站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "出发时间",
              isType: 1
            })
          }
        }
      }
    })

  },
  //改变城市
  cityChange: function (e) {
    var that = this;
    let inx = e.detail.value;
    let code = this.data.cityArray[inx].dictValue;
    let travelType = this.data.travelType;
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        var list = res.data.data.carModelList;
        var modelList = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].code == code) {
            modelList.push(list[i])
          }
        }


        that.setData({
          cityIndex: e.detail.value,
          cityCode: code,
          cityNull: "",
          modelIndex: 0,
        })


      }
    })
    // this.initData();
    this.initPlaceDateP();
    this.initDiscount();
  },

  //改变预约车型
  mobleChange: function (e) {
    console.log(e)
    var that = this;
    let inx = e.detail.value;
    let modelId = that.data.modelArray[inx].modelId;
    let modelName = that.data.modelArray[inx].name;
    var price = that.data.modelPriceDict[modelId];
    console.log("id:" + modelId + "name" + modelName)
    that.setData({
      modelIndex: e.detail.value,
      modelId: modelId,
      carModelName: modelName,
      modelNull: "",
      defaultModel: modelName,
      payData: price

    })
  },
  //初始化优惠
  initDiscount: function (e) {
    console.log("初始化优惠")
    var that = this;
    //获取缓存里的优惠数据
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        var discountList = res.data.data.discountList;
        for (var i = 0; i < discountList.length; i++) {
          //判断类型
          if (that.data.travelType == discountList[i].aircraftType && that.data.cityCode == discountList[i].code) {
            that.setData({
              titlePrice: discountList[i].price,
              discountId: discountList[i].discountId
            })

          }
        }

      }
    })

  },
  //车辆数据渲染
  mobleData: function () {
    var that = this;
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        var modelList = res.data.data.carModelList;
        var list = [];
        for (var i = 0; i < modelList.length; i++) {
          if (modelList[i].code == that.data.cityCode && modelList[i].siteId == that.data.siteId) {
            list.push(modelList[i])
          }
        }
        let modelPriceDict = list.reduce((memo, item) => {
          memo[item.modelId] = item.price;
          return memo;
        }, {})

        that.setData({
          modelArray: list,
          modelPriceDict: modelPriceDict,
        })
      }
    })
  },
  //改变乘车人数
  bindPeopleNumChange: function (e) {
    var that = this;
    let inx = e.detail.value;
    let peopleVal = that.data.peopleNum[inx].value;
    let peopleName = that.data.peopleNum[inx].name;
    console.log("val:" + peopleVal + "name" + peopleName)
    that.setData({
      peopleNumNull: "",
      peopleIndex: e.detail.value,
      people: peopleVal
    })

  },

  //改变抵达地点
  addressListChange: function (e) {
    var that = this;
    let inx = e.detail.value;
    let siteName = that.data.addressArray[inx].siteName;
    let siteIdx = that.data.addressArray[inx].siteId;
    if (that.data.travelType == 0 || that.data.travelType == 2) {

      that.setData({
        addressIndex: e.detail.value,
        startPlace: siteName,
        defaultSite: siteName,
        siteId: siteIdx,
        ifCarModel: true
      })
      that.mobleData();

    } else {
      that.setData({
        addressIndex: e.detail.value,
        endPlace: siteName,
        defaultSite: siteName,
        siteId: siteIdx,
        ifCarModel: true
      })
      that.mobleData();
    }

  },

  //出发选择地点
  addressChange: function (e) {
    this.addressChoose(e);
  },
  addressChoose: function (e) {
    console.log(e)
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        if (that.data.travelType == 0 || that.data.travelType == 2) {
          that.setData({
            addressNull: res.name,
            address: res.name,
            endPlace: res.name,
            longitude: res.longitude, //经度
            latitude: res.latitude, //纬度
            upadnew: true, //更新了地址
          })

          if (e.detail && e.detail.value) {
            that.data.address = e.detail.value;
          }
        } else {
          that.setData({
            startPlace: res.name,
            addressNull: res.name,
            address: res.name,
            longitude: res.longitude, //经度
            latitude: res.latitude, //纬度
            upadnew: true, //更新了地址
          })

          if (e.detail && e.detail.value) {
            that.data.address = e.detail.value;
          }
        }



      },
      fail: function (e) {},
      complete: function (e) {}
    })
  },
  //改变出发地点
  statrplaceMapChange: function (e) {
    this.setData({
      startPlaceStrNull: "",
      startPlace: e.detail.value
    })
  },
  //是否拼车
  carpoolingRadioChange: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        carpooling: 0,
      })
    } else if (e.detail.value == 1) {
      this.setData({
        carpooling: 1,
      })
    }
  },
  //是否订阅行程
  subscribeMsgRadioChange: function (e) {
    console.log('value值为：', e.detail.value)
    if (e.detail.value == 0) {
      this.setData({
        carpooling: 0,
      })
    } else if (e.detail.value == 1) {
      this.msgChange();
    }
  },

  showModal: function (error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //用户协议
  treaty: function (e) {
    wx.navigateTo({
      url: '../reserve/treaty/treaty',
    })

  },

  //隐私协议
  privacy: function (e) {
    wx.navigateTo({
      url: '../reserve/privacy/privacy',
    })

  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.travelType == 1 || this.data.travelType == 3) {
      console.log(this.data.defaultSite)
      this.setData({
        endPlace: this.data.defaultSite
      })
    } else {
      this.setData({
        startPlace: this.data.defaultSite
      })
    }


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



  submitForm(e) {
    var that = this;
    //如果不选择拼车默认实付金额控制
    if (that.data.crpooling == 0 || that.data.crpooling == "0") {
      that.setData({
        sfje: that.data.payData
      })
    }
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");
    if(that.data.openId == null || that.data.openId == ''){
      that.setData({
        openId:user.openId
      })
    }
    var params = e.detail.value
    that.data.form.type = that.data.travelType;
    that.data.form.name = params.name;
    that.data.form.phone = params.phone;
    that.data.form.flightNo = params.flightNo;
    that.data.form.city = params.city;
    that.data.form.cityCode = that.data.cityCode;
    that.data.form.modelId = params.mobleName;
    that.data.form.peopleNum = params.peopleNum;
    that.data.form.travelDate = params.travelDate;
    that.data.form.etime = params.etime;
    that.data.form.crpooling = that.data.crpooling;
    that.data.form.subscribeMsg = that.data.subscribeMsg;
    that.data.form.startPlace = that.data.startPlace;
    that.data.form.endPlace = that.data.endPlace;
    that.data.form.openId = that.data.openId;
    that.data.form.carModelName = that.data.defaultModel;
    console.log(params);
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(that.data.form)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    if(that.data.isLoaction == false ){
        if(that.data.travelType == 1 || that.data.travelType==3){
          that.setData({
            startPlace : params.startPlace
          })
        }else if(that.data.travelType == 0 || that.data.travelType==2){
          that.setData({
            endPlace : params.endPlace
          })
        }
    }

    if (that.data.travelType == 0 || that.data.travelType == 1) {
      if (params.flightNo == '' || params.flightNo == null) {
        wx.showModal({
          content: '请填写航班号码',
          showCancel: false
        })
        return false
      }
    } else {
      if (params.flightNo == '' || params.flightNo == null) {
        wx.showModal({
          content: '请填写车次号码',
          showCancel: false
        })
        return false
      }
    }
    if (that.data.travelType == 0 || that.data.travelType == 2) {
      if (that.data.endPlace == '' || that.data.endPlace == null) {
        wx.showModal({
          content: '请选择抵达地点',
          showCancel: false
        })
        return false
      }
    } else {
      if (that.data.startPlace == '' || that.data.startPlace == null) {
        wx.showModal({
          content: '请选择出发地点',
          showCancel: false
        })
        return false
      }
    }
    if (that.data.isChecked == false) {
      wx.showModal({

        content: '请查看用户协议并勾选',
        showCancel: false
      })
      return false
    }



    //判断出发地抵达地 接收传参
    // if(that.data.travelType == 1 || that.data.travelType == 3){
    //   that.setData({
    //     entPlace:params.endPlace
    //   })
    // }
    // if(that.data.travelType == 0 || that.data.travelType == 2){
    //   that.setData({
    //     startPlace:params.startPlace
    //   })
    // }

    if (wx.showLoading) {
      wx.showToast({
        icon: 'loading',
        title: 'Loading',
        mask: true
      })
    };
    wx.request({
      url: API.setBooking,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "type": that.data.travelType,
        "name": params.name,
        "phone": params.phone,
        "flightNo": params.flightNo,
        "cityCode": that.data.cityCode,
        "modelId": params.mobleName,
        "peopleNum": params.peopleNum,
        "travelDate": params.travelDate,
        "etime": params.etime,
        "crpooling": that.data.crpooling,
        "subscribeMsg": that.data.subscribeMsg,
        "startPlace": that.data.startPlace,
        "endPlace": that.data.endPlace,
        "openId": user.openId,
        "carModelName": that.data.defaultModel,
        "remarks": params.remarks,
        "amountsPayable": that.data.payData,
        "amountActuallyPaid": that.data.sfje,
        "discountId": that.data.discountId
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功!',
            duration: 1000,
            success: function () {
              // setTimeout(function() {
              wx.reLaunch({
                url: '/pages/order/order',
              })
              // }, 1000);
            }
          })
          // that.showModal({
          //   msg: '提交成功',
          // })
          // wx.reLaunch({
          //   url: '/pages/index/index',
          // });

        } else {
          wx.showModal({
            title: '提示',
            content: '预约失败，请重新提交!',
            showCancel: false,
            success(res) {
            }
          })
          console.log('服务器异常');
        }
      },
      fail: function (error) {
        console.log(error);

      }
    })


  },
  initValidate() {
    // 验证字段的规则
    const rules = {
      type: {
        required: true,
      },

      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      },

      city: {
        required: true,
      },
      modelId: {
        required: true,
      },
      people: {
        required: true,
      },
      travelDate: {
        required: true,
      },
      // isChecked:{
      //   required:true,
      // }
      // eitme: {
      //   required: true,
      // },
      // startPlace: {
      //   required: true,
      // },
      // endPlace: {
      //   required: true,
      // },



    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      type: {
        required: '请填写出行类型',
      },
      name: {
        required: '请填写姓名',
      },

      phone: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      flightNo: {
        required: '请输入航班号/车次',
      },
      city: {
        required: '请选择城市',
      },
      modelId: {
        required: '请选择车型',
      },
      people: {
        required: '请选择乘车人数',

      },
      travelDate: {
        required: '请输选择出发日期',
      },
      eitme: {
        required: '请输选择时间',
      },
      startPlace: {
        required: '请选择出发地点',
      },
      endPlace: {
        required: '请输选择抵达地点',
      },
      isChecked: {
        required: '请查看用户协议并勾选',
      },


    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)


  },
})