// pages/network-details/network-details.js
const {getoutInfo }  = require('../../api/shortrent/outletsManage')
const { PHOTO_NAME } = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoUrlList:[],
    info:{
      outletsId: null,
      outletsName: "null",
      outletsCityName: null,
      outletsCityCode: null,
      outletsAreaName: null,
      outletsAreaCode: null,
      outletsLongitude: null,
      outletsLatitude: null,
      outletsAddress: null,
      outletsUser: null,
      outletsUserPhone: null,
      outletsPhotoUrls: null,
      outletsPhotoNames: null,
    },  
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let param={
      outletsId:39,
    };
    //根据区域查询网点信息
    getoutInfo(param,{
      success(res){   
        that.setData({         
          info:res.data
        })
        let sap =res.data.outletsPhotoUrls.split(",");
        that.setData({
          photoUrlList:PHOTO_NAME+sap
        })
        console.log(that.data.photoUrlList)   
      },
      fail(err){
        console.log(err)
      }

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
// 导航
toNavgiat:function(){
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success (res) {
      const latitude = res.latitude
      const longitude = res.longitude
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      })
    }
   })

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