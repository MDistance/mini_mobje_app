// components/carTypeCom/carTypeCom.js
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
    value: 0,
    radio: '0',
    carNum:'0',
    days: ['1天', '2天', '3天', '4天','5天', '6天', '7天', '8天','9天', '10天', '11天'],
    carArr:[{},{},{},{}],
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onChangeCar(event) {
      this.setData({
        radio: event.detail,
      });
    },
    onChange1(event) {
      this.setData({
        checked1: event.detail,
      });
    },
    onChange2(event) {
      this.setData({
        checked2: event.detail,
      });
    },
    onChange3(event) {
      this.setData({
        checked3: event.detail,
      });
    },
    onChange4(event) {
      this.setData({
        checked4: event.detail,
      });
    },
  }
})
