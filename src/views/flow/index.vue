
<template>
  <div class="flow">
    <div id="container"></div>
  </div>
</template>

<script type="text/jsx">
import { source } from './config/source/source';
import { flowNodeGenerator } from './config/utilsg/utils'
import '@antv/x6-vue-shape'
import { Graph, Shape, Node, FunctionExt, DataUri } from '@antv/x6'
export default {
  name: 'flow',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      temp: '',
      connectEdgeType: {  //连线方式
        connector: 'rounded',
        shape: 'edge', // 'custom-edge-label',
        router: {
          name: ''
        }
      }
    }
  },
  computed: {},
  created () {
    this.temp = flowNodeGenerator(source["example.my.rcp.three.model:Diagram"].nodes)
    console.log(this.temp)


    
  },
  mounted () {

    const graph = new Graph({
      container: document.getElementById('container'),
      // autoResize: true,
      width: 700,//container.offsetWidth, // 画布宽
      height: 700,//container.offsetHeight, // 画布高
      background: { // 背景
        color: '#fffbe6'
      },
      grid: this.temp, // 网格设置
      mousewheel: {
        enabled: true, // 支持滚动放大缩小
      },
      scaling: {
        min: 0.5, // 默认值为 0.01
        max: 2, // 默认值为 16
      },
      panning: {
        enabled: true,
      },
      // resizing: { // 调整节点宽高
      //   enabled: true,
      //   orthogonal: false,
      // },
      // snap: {
      //   radius: 50 // 锚点吸附半径
      // },
      // selecting: {
      //   enabled: true, // 节点/边 可选中
      //   showNodeSelectionBox: true, // 节点选中后边框
      //   showEdgeSelectionBox: true // 边选中后边框
      // }, // 可选
      interacting: {
        edgeLabelMovable: true
      },
      // 配置连线规则
      connecting: { // 节点连接
        router: 'manhattan', // 连接线路由算法
        //   anchor: 'center',
        //   connectionPoint: 'anchor',
        connectionPoint: 'anchor', // 连接点为锚点
        snap: true, // 自动吸附
        allowBlank: false, //是否允许连接到画布空白位置的点
        allowMulti: false, //是否允许在相同的起始节点和终止之间创建多条边
        allowLoop: false, //是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        highlight: true, //拖动边时，是否高亮显示所有可用的节点
        validateEdge ({ edge, type, previous }) {
          // 连线时设置折线
          edge.setRouter({
            name: 'er',
          })
          // 设置连线样式
          edge.setAttrs({
            line: {
              stroke: '#cecece',
              strokeWidth: 1,
            },
          })
          return true
        },
        createEdge () {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#1890ff',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8
                },
                strokeDasharray: 0, //虚线
                style: {
                  animation: 'ant-line 30s infinite linear',
                }
              }
            },
            label: {
              text: ''
            },
            connector: this.connectEdgeType.value.connector,
            router: {
              name: this.connectEdgeType.value.router.name || ''
            },
            zIndex: 0
          })
        }
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: '#6a6c8a'
            }
          }
        }
      },
      // snapline: true, // 启用对齐线
      // keyboard: true, // 启用键盘事件
      // clipboard: true, // 启用粘贴板
      // history: true, // 启用历史记录
    })



  },
  methods: {},
  filters: {},
  watch: {}
}
</script>
<style lang='scss' scoped>
@import './flow.scss';
</style>
