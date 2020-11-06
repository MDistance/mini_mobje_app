// components/pickup_outlets/pickup_outlets.js
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js'); 
var BMap = new bmap.BMapWX({ 
  ak: 'S0kLEjeZBorgvU1jeoXaKl5BqEVHZS7V' 
}); 
var wxMarkerData = []; 
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    sugData: '',
    markers: [], 
    latitude: '', 
    longitude: '', 
    placeData: {} ,
    address:'解放大路站'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    okBtn(){
        var that=this;
        that.setData({
          hidden:true
        })
    },
     // 绑定input输入 
     bindKeyInput: function(e) { 
      var that = this; 
      // 新建百度地图对象 
      var fail = function(data) { 
          console.log(data) 
      }; 
      var success = function(data) { 
          var sugData = ''; 
          for(var i = 0; i < data.result.length; i++) { 
              sugData = sugData + data.result[i].name + '\n'; 
          } 
          that.setData({ 
              sugData: sugData 
          }); 
      } 
     // 发起suggestion检索请求 
      BMap.suggestion({ 
          query: e.detail.value, 
          region: '北京', 
          city_limit: true, 
          fail: fail, 
          success: success 
      }); 
  } ,
    makertap: function(e) { 
        var that = this; 
        var id = e.markerId; 
        that.showSearchInfo(wxMarkerData, id); 
        that.changeMarkerColor(wxMarkerData, id); 
    }, 
    onLoad: function() { 
        var that = this; 
        // 新建百度地图对象 
        var fail = function(data) { 
            console.log(data) 
        }; 
        var success = function(data) { 
            wxMarkerData = data.wxMarkerData; 
            that.setData({ 
                markers: wxMarkerData 
            }); 
            that.setData({ 
                latitude: wxMarkerData[0].latitude 
            }); 
            that.setData({ 
                longitude: wxMarkerData[0].longitude 
            }); 
        } 
       // 发起POI检索请求 
        BMap.search({ 
            "query": '酒店', 
            fail: fail, 
            success: success, 
            // 此处需要在相应路径放置图片文件 
            iconPath: '/assets/icons/marker.png', 
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '/assets/icons/marker.png' 
        }); 
    }, 
    showSearchInfo: function(data, i) { 
        var that = this; 
        that.setData({ 
            placeData: { 
                title: '名称：' + data[i].title + '\n', 
                address: '地址：' + data[i].address + '\n', 
                telephone: '电话：' + data[i].telephone 
            } 
        }); 
    }, 
    changeMarkerColor: function(data, i) { 
        var that = this; 
        var markers = []; 
        for (var j = 0; j < data.length; j++) { 
            if (j == i) { 
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = "../../img/marker_yellow.png"; 
            } else { 
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = "../../img/marker_red.png"; 
            } 
            markers[j](data[j]); 
        } 
        that.setData({ 
            markers: markers 
        }); 
    } 
  }
})
