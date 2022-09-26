<template>
  <div id="app">
    <china-map
      :key="key"
      cascade
      :echartsData="echartsData"
      :scatterData="scatterData"
      @mapClick="mapClick"
    />
  </div>
</template>

<script>
import chinaMap from "./components/chinaMap.vue";

export default {
  name: "App",
  components: {
    chinaMap,
  },
  data() {
    return {
      key: 0,
      testData: [
        {
          name: "上海市",
          value: 43214.85,
        },
        {
          name: "天津市",
          value: 15695.05,
        },
        {
          name: "浙江省",
          value: 73516,
        },
        {
          name: "山东省",
          value: 83095.9,
        },
        {
          name: "宁夏回族自治区",
          value: 4522.31,
        },
        {
          name: "河北省",
          value: 40391.3,
        },
        {
          name: "海南省",
          value: 6475.2,
        },
        {
          name: "北京市",
          value: 40269.6,
        },

        {
          name: "安徽省",
          value: 42959.2,
        },
        {
          name: "青海省",
          value: 3346.63,
        },
        {
          name: "新疆维吾尔自治区",
          value: 15983.65,
        },
        {
          name: "内蒙古自治区",
          value: 20514.2,
        },
        {
          name: "湖南省",
          value: 46063.09,
        },
        {
          name: "江苏省",
          value: 116364.2,
        },
        {
          name: "重庆市",
          value: 27894.02,
        },
      ],
      scatterData: [],
    };
  },
  created () {
    this.echartsData = this.testData.map(({name, value}) => {
      return {
        name: this.getCityName(name),
        value
      }
    })
  },
  methods: {
    mapClick({ code, name }) {
      console.log(code, name);
    },
    /**
     *@description 这个方法用来获取城市的简称，例如 北京市 => 北京。 内蒙古自治区 => 内蒙古
    */
    getCityName(cityName) {
      if (!cityName) return;
      let isAutonomy = cityName.search("自治区") != -1;
      if (isAutonomy) {
        return cityName.search("内") != -1
          ? cityName.substr(0, 3)
          : cityName.substr(0, 2);
      } else {
        return cityName.match(/(\S*)(省|市|特别行政区)/)
          ? cityName.match(/(\S*)(省|市|特别行政区)/)[1]
          : cityName;
      }
      // console.log('list2', this.list)
    },
  },
};
</script>
<style>
#app {
  background-color: #0f1e33;
}
</style>
