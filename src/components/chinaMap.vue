<template>
  <div ref="ct" style="width: 100%" class="chinaMapBox">
    <div ref="charts" :style="{ height: chartsHeight }" />
  </div>
</template>
<script>
import * as echarts from "echarts";
import mixins from "./mixins";
import { getMap } from "./maputils";
export default {
  mixins: [mixins],
  props: {
    chartsHeight: {
      type: String,
      require: false,
      default: "600px",
    },
    echartsData: {
      type: Array,
      require: false,
      default: () => [],
    },
    scatterData: {
      type: Array,
      require: false,
      default: () => [],
    },
    visualColor: {
      type: Array,
      require: false,
      default: () => ["#ffe57f", "#ff3456"],
    },
    zoom: {
      type: Number,
      require: false,
      default: 1,
    },
    visualText: {
      type: Array,
      require: false,
      default: () => ["高", "低"],
    },
    cityMapName: {
      type: String,
      require: false,
      default: "中国",
    },
  },

  data() {
    return {
      citylist: [{ 中国: "401200965" }],
      lastCity: {},
    };
  },
  methods: {
    initCharts() {
      // if (this.chartsData.length === 0) return;
      this.charts = echarts.init(this.$refs["charts"]);
      const option = {
        // 背景颜色
        // backgroundColor: "#404a59",
        // 提示浮窗样式
        tooltip: {
          show: true,
          trigger: "item",
          alwaysShowContent: false,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: [0, 10, 8, 10],
          roam: true,
          hideDelay: 100,
          triggerOn: "mousemove",
          enterable: true,
          borderColor: "rgba(0, 0, 0, 0.7)",
          //解决浮窗被遮挡
          confine: true,
          textStyle: {
            color: "#fff",
            fontSize: "12",
            width: 20,
            height: 30,
            overflow: "break",
          },
          showDelay: 50,
          formatter: (params) => {
              return `<p style="text-align:center;line-height: 30px;height:30px;font-size: 14px;border-bottom: 1px solid #7A8698;">${params.name}</p>
              <div style="line-height:22px;margin-top:5px">GDP<span style="margin-left:12px;color:#fff;float:right">${params.data?.value || "--"}</span></div>`;
            },
        },
        // 地图配置文字显示
        geo: {
          map: "china",
          // 禁止地图放大缩小
          roam: true,
          zoom: this.zoom,
          label: {
            // 通常状态下的样式
            normal: {
              show: false,
              textStyle: {
                color: "#fff",
              },
            },
            // 鼠标放上去的样式
            emphasis: {
              show: true,
              textStyle: {
                color: "#640000",
              },
            },
          },
          // 地图区域的样式设置
          itemStyle: {
            normal: {
              borderColor: "#5d5b4c",
              borderWidth: 1,
              areaColor: "#ffe57f",
            },
            // 鼠标放上去高亮的样式
            emphasis: {
              areaColor: "#cfb20a",
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            type: "map",
            roam: true,
            zoom: 1,
            geoIndex: 0,
            label: {
              // 通常状态下的样式
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
              // 鼠标放上去的样式
              emphasis: {
                textStyle: {
                  color: "#640000",
                },
              },
            },

            data: this.echartsData,
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            // 定位角标
            symbol: "pin",
            legendHoverLink: true,
            symbolSize: [18, 24],
            tooltip: {
              show: true,

              trigger: "item",
              alwaysShowContent: false,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: [0, 10, 8, 10],
              roam: true,
              hideDelay: 100,
              triggerOn: "mousemove",
              enterable: true,
              borderColor: "rgba(0, 0, 0, 0.7)",
              // 阴影，值越大阴影亮度越高
              // shadowBlur: 8,
              // shadowColor: "#00FCFF",
              textStyle: {
                color: "#fff",
                fontSize: "12",
                width: 20,
                height: 30,
                overflow: "break",
              },
              showDelay: 100,
            },
            // 这里渲染标志里的内容以及样式
            // label: {
            //   show: true,
            //   formatter(value) {
            //     return value.data.value[2];
            //   },
            //   color: "#fff",
            // },
            // // 标志的样式
            // itemStyle: {
            //   normal: {
            //     color: "#2c72db",
            //   },
            // },
            label: {
              normal: {
                show: true,
                formatter(value) {
                  return value.data.value;
                },
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: [10, 20, 10, 20],
                fontSize: "14",
                show: false,
                borderRadius: 5,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#26D17B",
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            // 数据格式，其中name,value是必要的，value的前两个值是数据点的经纬度，其他的数据格式可以自定义
            // 至于如何展示，完全是靠上面的formatter来自己定义的
            // data: [
            //   { name: '深圳', value: [114.02, 22.6, '深圳'] },
            //   { name: '大连', value: [121.61, 38.91, '大连'] },
            //   { name: '青岛', value: [120.4, 36.09, '青岛'] },
            // ],
            data: this.scatterData,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            zlevel: 1,
          },
        ],

        visualMap: {
          show: true,
          type: "continuous",
          // 这里最大值写死了，请根据实际需求进行变更
          max: 116364.2,
          text: this.visualText,
          calculable: true,
          seriesIndex: [0],
          inRange: {
            // 由低到高
            color: this.visualColor,
          },

          textStyle: {
            color: "#fff",
            map: "china",
          },
          bottom: "8px",
          right: "8px",
          backgroundColor: "#313E52",
          padding: [10, 8, 10, 8],
        },
        graphic: {
          type: "text",
          x: 25,
          y: 25,
          style: {
            text: "返回",
            fill: "#fff",
            font: 'bolder 2em "Microsoft YaHei", sans-serif'
          },
          onclick: () => {
            // 利用函数的作用域，可以直接拿上面的name来用
            if (this.citylist.length < 2) return;
            this.lastCity = this.citylist[this.citylist.length - 2];
            const name = Object.keys(this.lastCity)[0];
            const [grahpName, graphJson] = getMap(name);
            // 删除最后一个元素
            this.citylist.pop();
            // 很多操作重复了，你可以将公共部分抽离出来
            option.geo.map = grahpName;
            echarts.registerMap(grahpName, graphJson);
            this.charts.setOption(option, true);
          },
        },
      };

      const [mapName, mapJson] = getMap(this.cityMapName);
      option.geo.map = mapName;
      // 地图注册，第一个参数的名字必须和option.geo.map一致
      echarts.registerMap(mapName, mapJson);

      this.charts.setOption(option);

      // this.charts.off();
      this.charts.on("click", (dom) => {
        // 阻止散点图点击事件
        if (dom.seriesType === "scatter") return;
        // 暴露点击事件
        const { name: cityname, data } = dom;
        const name = cityname ? cityname : Object.keys(this.lastCity)[0];
        let code = "";
        if (dom.componentType === "series") {
          code = data?.areaUniCode ? data?.areaUniCode : this.lastCity[name];
        } else {
          code = this.lastCity[name];
        }
        const [mapName, mapJson] = getMap(name);
        // console.log(mapJson);
        if (mapJson) {
          if (dom.componentType === "series") {
            this.citylist.push({ [name]: code });
          }
          this.mapClick(code, name);
        }
        if (!mapJson) return;

        option.geo.map = mapName;
        // 设置为undefined，可以保证地图切换时总是居中
        option.geo.center = undefined;
        echarts.registerMap(mapName, mapJson);
        this.charts.setOption(option);
      });

      this.$refs["charts"].oncontextmenu = () => false;
    },
    // 向父组件提供点击事件，并提供点击省份的code和name
    mapClick(code, name) {
      this.$emit("mapClick", { code, name });
    },
  },
};
</script>
<style lang="scss"></style>
