// pages/reserve/edit/edit.js
//获取应用实例
var app = getApp()
// const API = require('../../../utils/api.js');
// import WxValidate from '../../../utils/validate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingId: '',
    type: '',
    name: '',
    phone: '',
    flightNo: '',
    travelDate: '',
    travelTime: '',
    typeName: '',
    flightNoNmae: '',
    travelTimeName: '',
    cityCode: '',
    modelArray: [],
    modelPriceDict: {},
    modelIndex: null,
    cityArray: [],
    cityIndex: 0,
    startPlace: '',
    endPlace: '',

    peopleArray: [{
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
    peopleIndex: 0,
    siteCityDataList: [],
    addressArray: [],
    addressIndex: null,
    address: '点击选择位置',
    bookingInfo: [],
    modelId: null,
    carModelName: '',
    defaultSite: '',
    isCarpooling: false,
    crpooling: 0,
    isSubscribeMsg: false,
    isChecked: true,
    subscribeMsg: 0,
    remarks: '',
    payData: '0',
    aircraftPrice: '0',
    titlePrice: '0',
    titlePriceJs: '0',
    discountId: null,
    selectsData: {},
    inputData: {},
    state: 0,
    siteId: '',
     endIsLoaction: false,
    startIsLoaction:false,
    isLoaction:false,
    openId:'',
    wxDate:'',
    wxTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //获取缓存里用户信息openid
     var user = wx.getStorageSync("userInfoData");
    this.setData({
      type:options.type,
      bookingId:options.bookingId,
      openId:user.openId
    })
    //初始化必要字段
    this.initSetData(options);
    this.getBooingInfo();
    this.initDiscount();
    this.initValidate() //验证规则函数


  },
  getDateTimes: function(e){
    var that = this;
   wx.request({
     url: API.getDateTimes,
     method: 'GET',
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     success: function (res) {
       if (res.data.code == 200) {
         debugger
         if(that.data.date == res.data.data.wxDate){
          that.setData({
            wxDate:res.data.data.wxDate,
            wxTime:res.data.data.wxTime
          })
         }else{
          that.setData({
            wxDate:res.data.data.wxDate,
            wxTime:'01:00'
          })
         }
       } 
     },
    
   })
  },

  //传过来的值
  initSetData: function (e) {
    let that = this;
     // 判断用户是否授权了位置信息
     wx.getSetting({
      success: (res) => {
        var statu = res.authSetting;
        //没授权
        if (!statu['scope.userLocation']) {
          if (e.type == 0) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "接机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "抵达时间",
              meetHide: true,
              endMeetHide: false,
              endIsLoaction:true,
      
            })
          }
          if (e.type == 1) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "送机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "出发时间",
              startIsLoaction:true,
              giveHide: false,
              endGiveHide: true,
            })
          }
          if (e.type == 2) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "接站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "抵达时间",
              meetHide: true,
              endMeetHide: false,
              endIsLoaction:true,
            })
          }
          if (e.type == 3) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "送站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "出发时间",
              giveHide: false,
              endGiveHide: true,
              startIsLoaction:true,
            })
          }

        }else{
          this.setData({
            isLoaction:true
          })
          if (e.type == 0) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "接机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "抵达时间",
              meetHide: true,
              endMeetHide: true,
      
            })
          }
          if (e.type == 1) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "送机服务",
              flightNoNmae: "航班号码",
              travelTimeName: "出发时间",
              giveHide: true,
              endGiveHide: true,
            })
          }
          if (e.type == 2) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "接站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "抵达时间",
              meetHide: true,
              endMeetHide: true,
            })
          }
          if (e.type == 3) {
            that.setData({
              bookingId: e.bookingId,
              type: e.type,
              typeName: "送站服务",
              flightNoNmae: "车次号码",
              travelTimeName: "出发时间",
              giveHide: true,
              endGiveHide: true,
            })
          }
        }
      }
    })
    

  },

  //根据id获取数据，渲染到页面
  getBooingInfo: function (e) {
    var that = this;
    var id = that.data.bookingId;
    //获取缓存里用户信息openid
    var user = wx.getStorageSync("userInfoData");


    wx.request({
      url: API.selectOneOrder,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        bookingId: id,
        openId: user.openId
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            selectsData: {
              "bookingId": res.data.data.bookingId,
              "type": res.data.data.type,
              "name": res.data.data.name,
              "phone": res.data.data.phone,
              "flightNo": res.data.data.flightNo,
              "cityCode": res.data.data.cityCode,
              "modelId": res.data.data.modelId,
              "peopleNum": res.data.data.peopleNum,
              "travelDate": res.data.data.travelDate,
              "etime": res.data.data.etime,
              "crpooling": res.data.data.carpooling,
              "startPlace": res.data.data.startPlace,
              "endPlace": res.data.data.endPlace,
              "openId": res.data.data.openId,
              "remarks": res.data.data.remarks,
              "amountsPayable": res.data.data.amountsPayable,
              "amountActuallyPaid": res.data.data.amountActuallyPaid,
              "discountId": res.data.data.discountId

            },
            bookingInfo: res.data.data,
            cityCode: res.data.data.cityCode,
            name: res.data.data.name,
            phone: res.data.data.phone,
            flightNo: res.data.data.flightNo,
            date: res.data.data.travelDate,
            travelTime: res.data.data.etime,
            remarks: res.data.data.remarks,
            aircraftPrice: res.data.data.amountActuallyPaid,
            // titlePriceJs: res.data.data.amountActuallyPaid,
            carpooling: res.data.data.carpooling,
            // titlePrice:res.data.data.amountsPayable,
            payData: res.data.data.amountsPayable,
            state: res.data.data.state,
            modelId: res.data.data.modelId,
            startPlace: res.data.data.startPlace,
            endPlace: res.data.data.endPlace,
          })
          if (res.data.data.carpooling == 1) {
            var price = that.data.payData - that.data.aircraftPrice;
            that.setData({
              isCarpooling: true,
              crpooling: 1,
              titlePriceJs: price,
            })
          } else {
            crpooling: 0
          }
          if (that.data.type == 1 || that.data.type == 3) {
            that.setData({
              address: res.data.data.startPlace,
              addressNull: res.data.data.startPlace,
            })
          } else {
            that.setData({
              address: res.data.data.endPlace,
              addressNull: res.data.data.endPlace,
            })

          }
          that.initData(res.data.data);
          that.initDiscount(res.data.data);
          that.getDateTimes();
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

  //根据获取到的数据  初始化 车型 抵达地  出发地
  initData: function (e) {
    var that = this;
    that.initPlaceDateP();
    //车型结果
    that.mobleData(e);

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
          if (that.data.type == discountList[i].aircraftType && that.data.cityCode == discountList[i].code) {
            that.setData({
              titlePrice: discountList[i].price,
              discountId: discountList[i].discountId,
            })

          }
        }

      }
    })

  },


  //改变时间
  bindDateChange: function (e) {
    var that = this;
    var detailDate = e.detail.value;
    if(detailDate == that.data.wxDate){
       //日期相同
      that.setData({
        date: e.detail.value,
      })
    }else{
     //日期不同
      that.setData({
        wxTime:'01:00',
        date: e.detail.value,
      })
    }
   
     
    

  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      travelTime: e.detail.value
    })
  },
  //出发选择地点
  addressChange: function (e) {
    this.addressChoose(e);
  },
  addressChoose: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        if (that.data.type == 0 || that.data.type == 2) {
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
  onCollageChange: function (event) {
    var that = this;
    var detail = event.detail;
    console.log("是否拼车")
    if (detail.value == true) {

      that.setData({
        isCarpooling: detail.value,
        crpooling: 1,
        aircraftPrice: that.data.titlePrice,
        titlePriceJs: that.data.titlePrice
      })
    } else {
      that.setData({
        isCarpooling: detail.value,
        crpooling: 0,
        aircraftPrice: 0,
        titlePriceJs: 0,
      })
    }
  },

  //用户协议
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
  //改变抵达地点
  addressListChange: function (e) {
    var that = this;
    let inx = e.detail.value;
    let siteName = that.data.addressArray[inx].siteName;
    let siteIdx = that.data.addressArray[inx].siteId;
    if (that.data.type == 0 || that.data.type == 2) {
      that.setData({
        addressIndex: e.detail.value,
        startPlace: siteName,
        siteId: siteIdx,
        defaultSite: siteName,
        modelIndex: 0,
      })
      that.mobleData();

    } else {
      that.setData({
        addressIndex: e.detail.value,
        endPlace: siteName,
        siteId: siteIdx,
        defaultSite: siteName,
        modelIndex: 0,
      })
      that.mobleData();
    }
    // that.initData();

  },

  //改变城市
  cityChange: function (e) {
    var that = this;

    let inx = e.detail.value;
    let code = this.data.cityArray[inx].dictValue;
    that.setData({
      cityIndex: e.detail.value,
      cityCode: code,
      modelIndex: 0,
      addressIndex: 0,
    })
    that.initPlaceDateP();
    that.mobleData();
    console.log(that.data.addressArray)
    that.initDiscount();
  },
  //改变预约车型
  mobleChange: function (e) {
    var that = this;
    var inx = e.detail.value;
    var modelId = that.data.modelArray[inx].modelId;
    var modelName = that.data.modelArray[inx].name;
    var price = that.data.modelPriceDict[modelId];
    
    that.setData({
      modelIndex: e.detail.value,
      modelId: modelId,
      carModelName: modelName,
      modelNull: "",
      defaultModel: modelName,
      payData: price,
      

    })
  },
  //初始化地点数据 根据出行类型，城市
  initPlaceDateP: function (e) {
    var that = this;
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        var siteId = '';
        //初始站点
        if (that.data.type == 0 || that.data.type == 1) {
          let addressList = res.data.data.siteList;
          let list = [];
          for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].code == that.data.cityCode && addressList[i].siteType == 0) {
              list.push(addressList[i])
            }
          }
          let data = {
            addressArray: list,
          }
          if (that.data.type == 0 || that.data.type == 2) {
            if(that.data.addressIndex != null){
              data.addressIndex = that.data.addressIndex
            }else{
              data.addressIndex = list.findIndex((addr) => addr.siteName == that.data.selectsData.startPlace)
            }

            data.siteId = list[data.addressIndex].siteId
            data.startPlace = list[data.addressIndex].siteName
          } else if (that.data.type == 1 || that.data.type == 3) {
            if(that.data.addressIndex != null){
              data.addressIndex = that.data.addressIndex
            }else{
              data.addressIndex = list.findIndex((addr) => addr.siteName == that.data.selectsData.endPlace)
            }
            data.siteId = list[data.addressIndex].siteId
            data.endPlace = list[data.addressIndex].siteName
          }

          that.setData(data)
        } else if (that.data.type == 2 || that.data.type == 3) {
          let addressList = res.data.data.siteList;
          let list = [];
          for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].code == that.data.cityCode && addressList[i].siteType == 1) {
              list.push(addressList[i])
            }
          }
          let data = {
            addressArray: list
          }
          if (that.data.type == 0 || that.data.type == 2) {
            if(that.data.addressIndex != null){
              data.addressIndex = that.data.addressIndex
            }else{
              data.addressIndex = list.findIndex((addr) => addr.siteName == that.data.selectsData.startPlace)
            }

            data.siteId = list[data.addressIndex].siteId
            data.startPlace = list[data.addressIndex].siteName
          } else if (that.data.type == 1 || that.data.type == 3) {
            if(that.data.addressIndex != null){
              data.addressIndex = that.data.addressIndex
            }else{
              data.addressIndex = list.findIndex((addr) => addr.siteName == that.data.selectsData.endPlace)
            }
            data.siteId = list[data.addressIndex].siteId
            data.endPlace = list[data.addressIndex].siteName
          }

          that.setData(data)
        }

        // that.initData();
      }
    })
  },
  //车辆数据渲染
  mobleData: function (e) {
    var that = this;
    wx.getStorage({
      key: "initReserveData",
      success: function (res) {
        //城市列表
        var cityList = res.data.data.cityDataList;

        //车型列表
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
        //车型处理
        var carList = res.data.data.carModelList;
        var mList = carList.filter(item => item.code == that.data.cityCode).filter(item => item.siteId == that.data.siteId)
        let data = {
          modelArray: list,
          modelPriceDict: modelPriceDict,
          cityArray: cityList,
          cityIndex: cityList.findIndex((city) => city.dictValue == that.data.cityCode)
        }
        if(that.data.modelIndex === null){
          data.modelIndex = (mList || []).findIndex((model) => model.modelId == that.data.modelId);
        }
        that.setData(data)
      }
    })
  },

  //改变乘车人数
  bindPeopleNumChange: function (e) {
    var that = this;
    let inx = e.detail.value;
    let peopleVal = that.data.peopleArray[inx].value;
    let peopleName = that.data.peopleArray[inx].name;
    console.log("val:" + peopleVal + "name" + peopleName)
    that.setData({
      peopleNumNull: "",
      peopleIndex: e.detail.value,
      people: peopleVal
    })

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

  showModal: function (error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //协议
  treaty: function (e) {
    wx.navigateTo({
      url: '../../reserve/treaty/treaty',
    })

  },
  //隐私协议
  privacy: function (e) {
    wx.navigateTo({
      url: '../reserve/privacy/privacy',
    })

  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true
      },

      city: {
        required: true,
      },

      mobleId: {
        required: true,
      },
      peopleNum: {
        required: true,
      },
      travelDate: {
        required: true,
      },
      etime: {
        required: true,
      },
    }
    const messages = {
      name: {
        required: '请填写姓名',
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },

      city: {
        required: '请选择城市',
      },

      mobleId: {
        required: '请选择预约车型',
      },
      peopleNum: {
        required: '请选择乘车人数',
      },
      travelDate: {
        required: '请选择出发日期',
      },
      etime: {
        required: '请选择出发时间',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  //调用验证函数
  submitForm: function (e) {
    var that = this;
    const params = e.detail.value
    var user = wx.getStorageSync("userInfoData");
    if(that.data.openId == null || that.data.openId == ''){
      that.setData({
        openId:user.openId
      })
    }
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if(that.data.isLoaction == false ){
      if(that.data.type == 1 || that.data.type==3){
        that.setData({
          startPlace : params.startPlace
        })
      }else if(that.data.type == 0 || that.data.type==2){
        that.setData({
          endPlace : params.endPlace
        })
      }
  }

    if (that.data.type == 0 || that.data.type == 1) {
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

    if (that.data.type == 0 || that.data.type == 2) {
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
    if (wx.showLoading) {
      wx.showToast({
        icon: 'loading',
        title: 'Loading',
        mask: true
      })
    };


    wx.request({
      url: API.updateBooking,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "bookingId": that.data.bookingId,
        "type": that.data.type,
        "name": params.name,
        "phone": params.phone,
        "flightNo": params.flightNo,
        "cityCode": that.data.cityCode,
        "modelId": params.mobleId,
        "peopleNum": params.peopleNum,
        "travelDate": params.travelDate,
        "etime": params.etime,
        "crpooling": that.data.crpooling,
        "startPlace": that.data.startPlace,
        "endPlace": that.data.endPlace,
        "openId": that.data.openId,
        "state": that.data.state,
        "remarks": params.remarks,
        "amountsPayable": that.data.payData,
        "amountActuallyPaid": that.data.payData - that.data.titlePriceJs,
        "discountId": that.data.discountId
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '修改成功!',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/order/order',
                })
              }, 1000);
            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: '修改失败，请重新提交!',
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDateTimes();
    // if (this.data.type == 1 || this.data.type == 3) {
    //   console.log("aaaaaa")
    //   console.log(this.data.defaultSite)
    //   this.setData({
    //     endPlace: this.data.defaultSite
    //   })
    // } else {
    //   this.setData({
    //     startPlace: this.data.defaultSite
    //   })
    // }


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