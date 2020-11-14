//获取应用实例
const app = getApp()
const { getBannerList } = require('../../api/shortrent/banner')
const { cityList }  = require('../../api/shortrent/cityManage')
const { getDeliveryPrice }  = require('../../api/shortrent/wechat')
const { DEV_NAME } = require('../../utils/api')
const BigNumber = require('bignumber.js');
Page({
  data: {
    baseUrl:DEV_NAME,
    pickup_city:'取车城市',
    pickup_outlets:'取车网点',
    return_city:'还车城市',
    return_outlets:'还车网点',
    home_delivery:'送车上门地点',
    pickup_time:'8:00',
    return_time:'8:00',
    allDays:'1',
    dateTime:{},
    startDate: '',
    endDate: '',
    baseAmt:0,
    price:'0',
    allPrice:'0',
    activeCar: 0,
    deliveryPrice:'0',
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    show: false,
    showView: false,
    hidden: true,
    radio: '0',
    checked: false,
    ///城市编码-todo 现在是死值 需要动态传参 @孟婷婷
    cityCode: '000582',
    imagesArr: [{
        id: 0,
        path: ''
      },
    ],
    location: null,
    carList:['宝来','大众朗逸','兰博基尼'],
    array: [{cityName:'长春',cityCode:'123'},{cityName:'成都',cityCode:'456'}],
    returnArray: [{cityName:'长春',cityCode:'123'},{cityName:'成都',cityCode:'456'}],
    index: 0,
    homeAdvertises: [],
    list: [{
        pathUrl: '/packageA/pages/newGuide/newGuide',
        image: "/assets/icons/xszy.png",
        itemName: "新手指引",

      },
      {
        pathUrl: '/packageA/pages/planAct/planAct',
        image: "/assets/icons/tchd.png",
        itemName: "套餐活动",

      },
      {
        pathUrl: '/packageA/pages/newGuide/newGuide',
        image: "/assets/icons/zysx.png",
        itemName: "注意事项",

      },
      {
        pathUrl: '/packageA/pages/newGuide/newGuide',
        image: "/assets/icons/qtsm.png",
        itemName: "其他说明",

      }
    ],
    car_series:'',//车系
    car_type:'',//车型
    carUrl:'',
    motto: 'Hello World',
    userInfo: {},

  },
  
  onLoad: function (options) {
   //获取banner列表
   this.getBannerLists();
   //根据城市编码获取上门送车价格
   this.deliveryPrice();
   // 设置默认日期时间
   this.getDateTime()
   if (app.globalData.userInfo) {
     this.setData({
       userInfo: app.globalData.userInfo,
       hasUserInfo: true
     })
   } else if (this.data.canIUse){
     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
     // 所以此处加入 callback 以防止这种情况
     app.userInfoReadyCallback = res => {
       this.setData({
         userInfo: res.userInfo,
         hasUserInfo: true
       })
     }
   } else {
     // 在没有 open-type=getUserInfo 版本的兼容处理
     wx.getUserInfo({
       success: res => {
         app.globalData.userInfo = res.userInfo
         this.setData({
           userInfo: res.userInfo,
           hasUserInfo: true
         })
       }
     })
   }


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    //查看是否授权
    that.userAuthorized();
  },
  // 点击车型
  showCar: function () {
    let that=this
    wx.navigateTo({
      url: '/pages/carType/carType',
      events:{
        getCarType:({car_type,car_series,carUrl,price})=>{
          that.setData({
            car_type:car_type,
            car_series:car_series,
            carUrl:carUrl,
            price:price
          });
          this.setBaseAmt()
        }
      },
      success: function(res) {
    // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPageCarType', {
          // car_type:that.data.car_type,
          // car_series:that.data.car_series,
          allDays:that.data.allDays,
          cityCode:that.data.cityCode
        })
      }
    })

  },
  // 跳转送车上门页面
  bindCarDoorAddress(){
    wx.chooseLocation({
			success: (res) => {
				this.setData({
					location: res
				});
			}
		});
    // wx.navigateTo({
    //   url: '/pages/carDoorAddress/carDoorAddress',
    //   events:{
    //     getOutlets: ({home_delivery}) => {
    //       that.setData({
    //         home_delivery:home_delivery
    //       });
    //       console.log(home_delivery)
    //     },
    //   },
    // })
  },
  onClose() {
    this.setData({
      showView: false
    });
  },
  // 送车上门按钮
  onChangeCar(event) {
    let checked = this.data.checked;
    checked = !checked
    this.setData({
      checked:checked
    })
    this.setBaseAmt()
  },
  setBaseAmt(){
    let baseAmt = new BigNumber(0);
    if(this.data.checked){
      baseAmt = baseAmt.plus(new BigNumber(this.data.deliveryPrice))
    }
    baseAmt = baseAmt.plus(new BigNumber(this.data.price))
    this.setData({
      baseAmt : baseAmt.toFixed(2)
    })
  },
//点击按钮弹出基础价格的详情信息框
modalinput: function () {
      this.setData({
        show: !this.data.show
      })
  },

    // 跳转选择日期页面
    bindTimeChange: function () {
      let that=this
      wx.navigateTo({
        url: '/pages/chooseDateTime/chooseDateTime',
        events:{
          getDate: ({start, end,pickup_time, return_time,allDays}) => {
            that.setData({
              startDate:start,
              endDate:end,
              pickup_time:pickup_time,
              return_time:return_time,
              allDays:allDays
            });
            console.log(pickup_time,return_time)
          },
        },
        success: function(res) {
      // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            startDate:that.data.startDate,
            endDate:that.data.endDate,
            pickup_time:that.data.pickup_time,
            return_time:that.data.return_time,
            allDays:that.data.allDays
          })
        }
      })
     
    },
  // 确认按钮
  confirm: function () {
    let that = this;
    //点击确认按钮，如果hasUserInfo为false跳转到登录页
    that.navigateToLogin();
    },
    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },
   // 设置默认日期时间
  getDateTime:function(){
    const now = new Date();
    const next = new Date(now.getTime() + 24*60*60*1000)
    console.log(next)
    wx.setStorageSync('startDate', now)
    wx.setStorageSync('endDate', next)
    this.setData({
      startDate: now.getTime(),
      endDate: next.getTime()
    });
  },
  // 取车城市
  bindPickerCity: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 取车网点
  bindPickerAddress: function () {
    wx.navigateTo({
      url: '../chooseOutlets/chooseOutlets',
      events:{
        getPickupOutlets: ({pickup_outlets}) => {
          that.setData({
            pickup_outlets:pickup_outlets
          });
          console.log(pickup_outlets)
        },
      },
    })
  },
  // 还车城市
  bindBackCity: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 还车网点
  bindBackAddress: function () {
    wx.navigateTo({
      url: '../chooseOutlets/chooseOutlets',
      events:{
        getBackOutlets: ({return_outlets}) => {
          this.setData({
            return_outlets:return_outlets
          });
          console.log(return_outlets)
        },
      },
    })
  },
  // 新手指引
  jump: function () {
    wx.navigateTo({
      url: '../newGuide/newGuide',
    })
  },
   //根据城市编码获取上门送车价格
   deliveryPrice: function(e){
    let that = this;
    getDeliveryPrice({
      cityCode:that.data.cityCode
    }, {
      success(res) {
        if (res.code == 200) {
          that.setData({
            deliveryPrice: res.data.price
          })
        }
      },
      fail(err) {

      }
    })
  },
  //查看是否授权
  userAuthorized() {
    let that = this;
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              app.globalData.hasUserInfo = true;
              that.setData({
                userInfo: data.userInfo
              })
            }
          })
        } else {
          app.globalData.hasUserInfo = false;

        }
      }
    })
  },
  //获取banner列表
  getBannerLists: function (e) {
    let that = this;
    getBannerList({}, {
      success(res) {
        if (res.code == 200) {
          that.setData({
            homeAdvertises: res.data
          })
          // console.log(res.data)
        } else {
          console.log('banner服务器异常');
        }
      },
      fail(err) {
      
      }
    })
  },

  //如果未授权跳转到登录页
  navigateToLogin: function (e) {
    wx.navigateTo({
      url: '/pages/vaddService/vaddService',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPageVaddService', {
              allPrice:that.data.allPrice,
            })
          }
    })
    let that = this;
    if (app.globalData.hasUserInfo == false) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/vaddService/vaddService',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPageVaddService', {
                allPrice:that.data.allPrice,
              })
            }
      })
    }

  },

})