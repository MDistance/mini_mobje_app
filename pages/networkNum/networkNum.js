// 引用百度地图微信小程序JSAPI模块 
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var config = require('../../libs/config.js');
var key = config.Config.key;
var qqmapsdk = new QQMapWX({key: key});
var markersData = [];
var rate = 0; //分辨转换
var floatTop = 0; //悬浮高度
Page({ 
    data: { 
        markers: [],
        latitude: '',
        longitude: '',
        textData: {},
        city: '',
        ips: [
          { id: "1", title: "全部", isSelect:true },
          { id: "2", title: "养老", isSelect: false},
          { id: "3", title: "儿童", isSelect: false},
          { id: "4", title: "健身", isSelect: false },
          { id: "5", title: "旅行", isSelect: false },
          { id: "6", title: "互联网", isSelect: false },
          { id: "7", title: "大数据", isSelect: false },
          { id: "8", title: "比特币", isSelect: false },
          { id: "9", title: "宅基地三权分置", isSelect: false },
        ],
    }, 
 /**
    * item点击事件
    */
   onIpItemClick: function (event) {
    console.log(event);
    var id = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      content: this.data.ips[curIndex].title,
      ips: this.data.ips,
    });
  },
      // 跳转列表
  toList:function(){
    wx.navigateTo({
      url: '/pages/chooseOutlets/chooseOutlets',
    })
  },
    //数据回填方法
backfill: function (e) {
  var id = e.currentTarget.id;
  for (var i = 0; i < this.data.suggestion.length;i++){
    if(i == id){
      this.setData({
        backfill: this.data.suggestion[i].title
      });
    }  
  }
},


//触发关键词输入提示事件
getsuggest: function(e) {
  var _this = this;
  //调用关键词提示接口
  qqmapsdk.getSuggestion({
    //获取输入框值并设置keyword参数
    keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
    //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
    success: function(res) {//搜索成功后的回调
      console.log(res);
      var sug = [];
      for (var i = 0; i < res.data.length; i++) {
        sug.push({ // 获取返回结果，放到sug数组中
          title: res.data[i].title,
          id: res.data[i].id,
          addr: res.data[i].address,
          city: res.data[i].city,
          district: res.data[i].district,
          latitude: res.data[i].location.lat,
          longitude: res.data[i].location.lng
        });
      }
      _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
        suggestion: sug
      });
    },
    fail: function(error) {
      console.error(error);
    },
    complete: function(res) {
      console.log(res);
    }
  });
},

    // 事件触发，调用接口
nearby_search:function(){
  var _this = this;
  // 调用接口
  qqmapsdk.search({
     keyword: 'kfc',  //搜索关键词
     location: '39.980014,116.313972',  //设置周边搜索中心点
     success: function (res) { //搜索成功后的回调
       var mks = []
       for (var i = 0; i < res.data.length; i++) {
         mks.push({ // 获取返回结果，放到mks数组中
           title: res.data[i].title,
           id: res.data[i].id,
           latitude: res.data[i].location.lat,
           longitude: res.data[i].location.lng,
           iconPath: "/assets/img/marker.png", //图标路径
           width: 20,
           height: 20
         })
       }
       _this.setData({ //设置markers属性，将搜索结果显示在地图中
         markers: mks
       })
     },
     fail: function (res) {
       console.log(res);
     },
     complete: function (res){
       console.log(res);
     }
 })},
     // 绑定input输入 
     makertap: function(e) {
        var id = e.markerId;
        var that = this;
        that.showMarkerInfo(markersData,id);
        that.changeMarkerColor(markersData,id);
      },
      onLoad: function(e) {
        this.getScrollTop();
         // 页面加载获取当前定位位置为地图的中心坐标
        var that = this;
        wx.getLocation({
        success(data) {
          console.log(data)
          if (data) {
            that.setData({
            latitude: data.latitude,
            longitude: data.longitude,
            markers:[{
            id:0,
            latitude: data.latitude,
            longitude: data.longitude,
            iconPath: '/assets/img/mapicon_navi.png',
            width: 32,
            height: 32
            }]
          });
          }
        }
        });
   },
   /**
   * 获得滑动导致悬浮开始的高度
   * @return {[type]} [description]
   */
  getScrollTop: function () {
    var that = this;
    if (wx.canIUse('getSystemInfo.success.screenWidth')) {
      wx: wx.getSystemInfo({
        success: function (res) {
          rate = res.screenWidth / 750;
          floatTop = 104 * rate;
          that.setData({
            scrollTop: 104 * res.screenWidth / 750,
            scrollHeight: res.screenHeight / (res.screenWidth / 750) - 128,
          });
        }
      });
    }
  },
 
})