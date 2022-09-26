export default {
  data() {
    return {
      charts: {},
      resize: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.initCharts()
      const ct = this.$refs['ct']
      this.resize = this.throttle(() => this.chartssize(ct, this.charts, 0, 0))
      // 元素添加点击事件
      window.addEventListener('resize', this.resize)
    })
  },
  destroyed() {
    // 元素移除点击事件
    window.removeEventListener('resize', this.resize)
    Object.keys(this.charts).length !== 0 && this.charts.dispose()
  },
  methods: {
    /**
    *@description 为图表计算高度
    *@param container 父容器
    *@param charts echarts对象
    *@param offsetX 横轴偏移，可不填，默认50px
    *@param offsetY 纵轴偏移，可不填，默认70px
    */
    chartssize(container, charts, offsetX = 50, offsetY = 70) {
      // function getStyle(el) {
      //   if (window.getComputedStyle) {
      //     const doc = window.getComputedStyle(el)
      //     const height = parseInt(doc.height)
      //     const width = parseInt(doc.width)
      //     return { height, width }
      //   } else {
      //     return { height: container.clientHeight, width: container.clientWidth }
      //   }
      // }
      // const { height, width } = getStyle(container, null)
      // charts.resize({ width: parseInt(width - offsetX), height: parseInt(height - offsetY) })
      charts.resize()
    },
    /**
     *@description 节流函数
    */
    throttle(fn) {
      let timer
      return function() {
        if (timer) {
          return
        }
        timer = setTimeout(() => {
          fn()
          clearTimeout(timer)
          timer = null
        }, 1000)
      }
    }

  }
}
