const BigNumber = require('bignumber.js');
const Behavior = require('miniprogram-computed')
module.exports = Behavior({
  data: {
    checkedSetmeal: {},
  },
  methods: {
    price() {
      return Object.values(data.checkedSetmeal).map(item => (new BigNumber(item.amt)).multipliedBy(item.number)).reduce((sum, i) => sum.plus(i), new BigNumber('0')).toFixed(2)
    }
  }
})