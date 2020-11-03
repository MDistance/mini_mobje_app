//获取应用实例
const app = getApp()

Page({
  data: {
    pickup_city:'取车城市',
    pickup_outlets:'取车网点',
    return_city:'还车城市',
    return_outlets:'还车网点',
    home_delivery:'送车上门地点',
    activeCar:0,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    show: false,
    showCar:false,
    showView:false,
    hidden:true,
    radio: '0',
    checked: false,
    imagesArr:[
      {
        id: 0,
        path:''
      },
      {
        id: 0,
        path:''
      },
      {
        id: 0,
        path:''
      },
    ],
    carList:['宝来','大众朗逸','兰博基尼'],
    array: ['长春', '成都', '松原', '延边'],
    backArray: [ '松原', '延边','长春', '成都'],
    index: 0,
    days: ['1天', '2天', '3天', '4天','5天', '6天', '7天', '8天','9天', '10天', '11天'],
    travelTime:'2020-10-20',

    homeAdvertises: [{
      'imgUrl': '',
      'webUrl': ''
    },
    {
      'imgUrl': '',
      'webUrl': ''
    },
    {
      'imgUrl': '',
      'webUrl': ''
    }
  ],
  list:[
    {
      url: "",
      image: "/assets/icons/xszy.png",
      itemName: "新手指引",

    },
    {
      url: "",
      image: "/assets/icons/tchd.png",
      itemName: "套餐活动",

    },
    {
      url: "",
      image: "/assets/icons/zysx.png",
      itemName: "注意事项",

    },
    {
      url: "",
      image: "/assets/icons/qtsm.png",
      itemName: "其他说明",

    }
  ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 点击车型
  showCar(event) {
      var that=this;
      that.setData({
        showView:true
      })
  },

  onClose() {
    this.setData({ showView:false });
  },
  // 送车上门按钮
  onChangeCar(event) {
    this.setData({
      checked: event.detail,
    });
  },
  // 点击车型tab按钮
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
//点击按钮弹出基础价格的详情信息框
modalinput: function () {
      this.setData({
        show: !this.data.show
      })
  },
// 确认按钮
confirm: function () {
  wx.navigateTo({
    url: '/pages/vaddService/vaddService',
  })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    showView:(options.showView=="true"?true:false)
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
    })
  },

  // 新手指引
  jump: function () {
    wx.navigateTo({
      url: '../newGuide/newGuide',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
