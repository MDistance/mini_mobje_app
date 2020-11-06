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
<<<<<<< HEAD
    value: 0,
=======
    value: 1,
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
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
<<<<<<< HEAD
    onChangeCar(event) {
=======
    onChangeRadio(event) {
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
      this.setData({
        radio: event.detail,
      });
    },
<<<<<<< HEAD
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
=======
    onChange(value) {
        console.log(value);
>>>>>>> 526926e08a8f3c0bd687c16076f7d1f014019d9c
    },
  }
})
