const { carTypeList, getCarSeriesSetmeal, getCarSeriesList} = require('../../api/shortrent/carType')
const BigNumber = require('bignumber.js');
const { DEV_NAME } = require('../../utils/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:DEV_NAME,
    active: 0,
    setmealList: [],
    oneDay:{},//普通租赁套餐
    others:[],
    value: 0,
    radio: '0',
    carNum: '0',
    carArr: [
      {
        car_type: '',
        car_series: '',
        price: '',
        name: '1',
        url:''
      },
    ],//车系列表
    carList: [],//车型列表tabs数组
    carTypeList:[],//车型列表
    checked: false,
    setmeal_days: '',//套餐天数
    setmeal_duration: '',//套餐时间
    setmeal_mileage: '',//套餐里程,
    duration: '11',//时长
    setmeal: '',//套餐
    checkedSetmeal: {},//选中的套餐按钮
    price: 0,//总价格
    realDuration: 0,//总时长
    isShow:false,//是否展示租赁方式
    defaultCarType:'',
    defaultCarSeries:'',
  },
  clear(){
    this.setData({
      checkedSetmeal:{},
      price:0,
      realDuration:0
    })
  },
  // 天数时间金额计算
  setPriceAndRealDuration() {
    // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
    // 这个函数的返回值会被设置到 this.data.sum 字段中
    // console.log(Object.values(data.checkedSetmeal).map(item => (new BigNumber(item.amt)).multipliedBy(item.number)).reduce((sum, i) => sum.plus(i), new BigNumber('0')).toFixed(2))
    // return 

    const price =  Object.values(this.data.checkedSetmeal).map(item => (new BigNumber(item.price)).multipliedBy(item.num)).reduce((sum, i) => sum.plus(i), new BigNumber('0')).toFixed(2);
    const realDuration = Object.values(this.data.checkedSetmeal).map(item => (new BigNumber(item.days)).multipliedBy(item.num)).reduce((sum, i) => sum.plus(i), new BigNumber('0')).toFixed(0)
    this.setData({
      price : price,
      realDuration: realDuration
    })
  },
  onLoad: function () {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPageCarType', function ({ allDays,cityCode }) {
      that.setData({
        duration: allDays,
        cityCode:cityCode
      })
      console.log(allDays)
    })
    this.getCarTypeList(() => {
      const carTypeId = this.data.carTypeList[0].carTypeId;
      this.getCarSeriesList(carTypeId)
    });
  },
  onClick(event) { 
  if(this.data.defaultCarType === event.detail){
    return
  }
    this.clear()
    this.getCarSeriesList(this.data.carTypeList[event.detail.index].carTypeId)
  },
  //获取车型列表
  getCarTypeList: function (cb) {
    let that = this;
    let param = {
      cityCode: that.data.cityCode,
      carTypeId: '1'
    };
    carTypeList(param, {
      success(res) {
        console.log(res)
        let data=res.data.map(item => {
          let data = {}
          Object.assign(data, item)
          data.carTypeId = item.carTypeId
          data.carTypeName= item.carTypeName
          data.cityCode= item.cityCode
          return data
        });

        that.setData({
          carTypeList:data
        })
        if (cb){
          cb()
        }
        console.log(carTypeList)
      },
      fail(err) {
        console.log(err)
      }

    })
  },
  // 获取车系列表
  getCarSeriesList: function (carTypeId) {
    let that = this;
    const cityCode = this.data.cityCode;
    getCarSeriesList({carTypeId,cityCode}, {
     
      success(res) {
        console.log(res)
         let salist=res.data.map(item => {
          let data = {}
          Object.assign(data, item)
          data.car_type = item.carSeriesName
          data.car_series= item.carSeriesProperty
          data.name= item.carSeriesId
          data.price= item.price//车辆价格
          data.url=item.carSeriesImg
          return data
        });
        that.setData({
          carArr: salist
          
        })
        console.log(salist)
      },
      fail(err) {
        console.log(err)
      }

    })
  },
  //获取套餐列表
  getCarSeriesSetmeal: function (carSeriesId) {
    let that = this;
    getCarSeriesSetmeal({carSeriesId}, {
      success(res) {
        console.log(res)
        let salist = res.data.map(item => {
          let data = {}
          Object.assign(data, item)
          data.setmeal_name = item.carSetmealName
          data.price = item.price
          data.num = 1
          data.checked = false
          return data
        });
        const oneDayList = salist.filter(item => item.type === 0);
        let oneDay = null;
        if(oneDayList.length > 0){
          oneDay = oneDayList[0]
        }
        let others =  salist.filter(item => item.type !== 0);
        that.setData({
          oneDay:oneDay,
          others:others,
          setmealList: salist
        })
      },
      fail(err) {
        console.log(err)
      }

    })
  },
  // 车型选择radio按钮
  onChangeCar(event) {
    if(this.data.defaultCarSeries === event.detail){
      return
    }
    this.clear()
    this.getCarSeriesSetmeal(this.data.carArr.find(item=>item.name === event.detail).carSeriesId)
    this.setData({
      isShow: true,
      radio: event.detail,
      defaultCarSeries:event.detail
    });
    console.log(event.detail)
  },
  // 其他套餐复选框
  onChange(e) {
    let setmealList = this.data.setmealList;
    const index = setmealList.findIndex(item => item.carSetmealId === e.currentTarget.dataset.carSetmealId);
    let setmeal = setmealList[index];
    let checkedSetmeal = this.data.checkedSetmeal;

    setmeal.checked = !setmeal.checked;
    setmealList[index] = setmeal
    if (setmeal.checked) {
      checkedSetmeal[setmeal.carSetmealId] = setmeal
    } else {
      delete checkedSetmeal[setmeal.carSetmealId]
    }
    const oneDay = setmealList.filter(item => item.type === 0)[0];
    const others =  setmealList.filter(item => item.type !== 0);
    this.setData({
      oneDay:oneDay,
      others:others,
      setmealList: setmealList,
      checkedSetmeal: checkedSetmeal
    });
    this.setPriceAndRealDuration()
  },
  // 其他套餐方式计步器
  onChangeStep(e) {
    let setmealList = this.data.setmealList;
    const index = setmealList.findIndex(item => item.carSetmealId === e.currentTarget.dataset.carSetmealId);
    let setmeal = setmealList[index];
    setmeal.num = e.detail;
    setmealList[index] = setmeal;
    let checkedSetmeal = this.data.checkedSetmeal;
    checkedSetmeal[setmeal.carSetmealId] = setmeal;

    const oneDay = setmealList.filter(item => item.type === 0)[0];
    const others =  setmealList.filter(item => item.type !== 0);

    this.setData({
      oneDay:oneDay,
      others:others,
      setmealList: setmealList,
      checkedSetmeal: checkedSetmeal
    });
    this.setPriceAndRealDuration()
   
  },
  // 返回主页
  confirmBtn: function (e) {
    const that = this;
    this.getOpenerEventChannel().emit('getCarType', {
      car_type: this.data.carArr.find(item=>item.name === that.data.radio).car_type,
      car_series: this.data.carArr.find(item=>item.name === that.data.radio).car_series,
      carUrl: this.data.carArr.find(item=>item.name === that.data.radio).url,
      price: this.data.price,
    });
 //判断天数时间是否相等
    if(this.data.duration < this.data.realDuration){
      wx.showToast({
        title: '请选择与您选择的时间相等的套餐',
        icon:'none'
      })
    }else if(this.data.duration > this.data.realDuration){
      wx.showToast({
        title: '请选择与您选择的时间相等的套餐',
        icon:'none'
      })
    }else{
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */


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