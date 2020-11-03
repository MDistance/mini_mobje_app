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
    value: 1,
    radio: '0',
    days: ['1天', '2天', '3天', '4天','5天', '6天', '7天', '8天','9天', '10天', '11天'],
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onChangeRadio(event) {
      this.setData({
        radio: event.detail,
      });
    },
    onChange(value) {
        console.log(value);
    },
  }
})
