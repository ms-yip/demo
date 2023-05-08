<template>
  <h1>  流程图示例 x6
  </h1>
  <div class="main">
    <!-- <div class="left">
      模块列表
        <div class="menu-list">
          <div
            v-for="item in moduleList"
            :key="item.id"
            draggable="true"
            @dragend="handleDragEnd($event, item)"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
    </div> -->
    <div ref="stencilContanerRef" class="left stencil"></div>
    <div class="container">
      <div class="tools">
        <el-button type="text" @click="transform" title="平移" icon="Rank"></el-button>
        <el-button type="text" @click="getPanning" title="是否可以平移" icon="Notification"></el-button>
        <el-button type="text" @click="togglePanning" title="切换平移权限" icon="Switch"></el-button>
        <el-button type="text" @click="max" title="放大" icon="ZoomIn"></el-button>
        <el-button type="text" @click="min" title="缩小" icon="ZoomOut"></el-button>
        <el-button type="text" @click="zoomTo" title="还原" icon="FullScreen"></el-button>
        <el-button type="text" @click="getZoom" title="获取缩放比例" icon="InfoFilled"></el-button>
        <el-button type="text" @click="tocenter" title="回到画布中心" icon="Setting"></el-button>
        <el-button type="text" @click="addNodeAndEdge" title="添加图形" icon="Setting"></el-button>
        <el-button type="text" @click="addCustomNode" title="添加Node" icon="Setting"></el-button>
        <el-button type="text" @click="addHTMLNode" title="添加html" icon="Setting"></el-button>
        <el-button type="text" @click="redo" :disabled="!canRedo" title="撤回" icon="RefreshLeft"></el-button>
        <el-button type="text" @click="undo" :disabled="!canUndo" title="重做" icon="RefreshRight"></el-button>
        <el-button type="text" @click="saveToPNG" title="保存png" icon="Picture"></el-button>
        <el-button type="text" @click="deleteNode" title="删除节点" icon="Delete"></el-button>
        <el-button type="text" @click="saveJSON" title="导出JSON" icon="Download"></el-button>
       <el-button type="text" @click="upper" title="返回" icon="Back">返回</el-button>

      </div>
      <div ref="graphContanerRef"></div>
    </div>
    <div class="right">
      <div id="minimap"></div>
      配置区域
      <el-button type="text" @click="redraw">重绘</el-button>
      <el-button type="text" @click="hideGrid">hideGrid</el-button>

      <div v-if="type === 'grid'">grid</div>
      <div v-if="type === 'node'">
        node信息
        <el-button type="text" @click="setNode">设置节点</el-button>
        <pre>
          入参
          {{ curSelectNode?.data?.inputParams || '无'}}
          出参
          {{ curSelectNode?.data?.outputParams || '无' }}
        </pre>

      </div>
      <div v-if="type === 'edge'">edge</div>

    </div>
  </div>
</template>
 
<script setup lang="ts">
import '@antv/x6-vue-shape'
import { Graph, Shape, Node, FunctionExt, DataUri } from '@antv/x6'
import Tools from '../flow/events/graphTools'
import RightDrawer from './RightDrawer.vue';
import { History } from "@antv/x6-plugin-history";
import { Export } from "@antv/x6-plugin-export";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Stencil } from "@antv/x6-plugin-stencil";
import { createPorts } from '@/views/flow/shape/shape';
import { onMounted, ref, nextTick, reactive } from "vue";
import insertCss from 'insert-css';
import { Selection } from "@antv/x6-plugin-selection";
import { MiniMap } from "@antv/x6-plugin-minimap";
import { logicalExpression } from '@babel/types';
import { source } from '@/views/flow/config/source';
import { flowNodeGenerator, displayData } from '@/views/flow/config/utils';

import useGraph from '../flow/hooks/useGraph' // '@/views/flow/hooks/useGraph'

const selectCell = ref('')


let _graph = ref()



const  moduleList = [
  {
    id: 1,
    name: '开始模块',
    type: 'initial' // 初始模块(用于区分样式)
  },
  {
    id: 2,
    name: '结束模块',
    type: 'initial'
  },
  {
    id: 3,
    name: '逻辑模块1',
    type: 'logic' // 逻辑模块(用于区分样式)
  },
  {
    id: 4,
    name: '逻辑模块2',
    type: 'logic'
  }
] // 列表可拖动模块
let curSelectNode = ref(null) // 当前选中的节点


const node11 = new Shape.HTML({
  id: 'node11',
  x: 1300,
  y: 400,
  width: 80,
  height: 40,
  attrs: {
    body: {
      stroke: '#1890ff',
    },
    label: {
      text: "html",
      fontSize: 25,
    },
  },
})

const edge7_11 = new Shape.Edge({
  source: 'node7',
  target: 'node11',
  attrs: {
    line: {
      stroke: '#1890ff',
      strokeDasharray: 1,
      targetMarker: 'classic',
    }
  },
})
const canRedo = ref(false)
const canUndo = ref(false)
const temp = useGraph()
console.log(temp)
const type = ref('grid')
const connectEdgeType = ref({  //连线方式
  connector: 'rounded',
  shape: 'edge', // 'custom-edge-label',
  router: {
    name: ''
  }
})


let sub = ref('')
let graphDatas = ref()

// const stencilContanerRef = ref<HTMLElement | null>(null)
// const graphContanerRef = ref<HTMLElement | null>(null)

// onMounted(() => {
//   const graphContaner = graphContanerRef.value!
//   const stencilContaner = stencilContanerRef.value!

//   console.log(graphContaner)
//   console.log(stencilContaner)

// })

// onMounted(() => {
//   // const container = document.getElementById('container') as HTMLElement;

//   const gridTemp = flowNodeGenerator(source["example.my.rcp.three.model:Diagram"].nodes)

//   console.log('gridTemp', gridTemp)
//   sub.value = gridTemp.subParentId
//   graphDatas.value = gridTemp

//   // _graph.value.use(
//   //   new Selection({
//   //     enabled: true,
//   //   })
//   // );
//   // _graph.value.use(
//   //   new MiniMap({
//   //     container: document.getElementById("minimap"),
//   //   })
//   // );
//   // _graph.value.use(new Export());

//   // _graph.value.use(
//   //   new History({
//   //     enabled: true,
//   //   })
//   // ); // 2.0版本api换了
//   // _graph.value.use(
//   //   new Snapline({
//   //     enabled: true,
//   //   })
//   // );// 2.0版本 变成插件用法


//   // insertCss(`
//   //   @keyframes ant-line {
//   //     to {
//   //         stroke-dashoffset: -1000
//   //     }
//   //   }
//   // `)


//   _graph.value.fromJSON(gridTemp);
//   // _graph.value.addNode(node11); // 加节点
//   // _graph.value.addEdge(edge7_11) // 加线


  

//   // _graph.value.enablePanning()
//   _graph.value.enableMouseWheel()  // 启用鼠标滚轮缩放画布
//   nodeAddEvent()

// })


function deleteNode() {// 删除节点
  const cell = _graph.value.getSelectedCells()
  _graph.value.removeCells(cell)
  type.value = 'grid'
}

function saveJSON() {
  console.log(JSON.stringify(_graph.value.toJSON(), null, 2))
  alert(JSON.stringify(_graph.value.toJSON(), null, 2))
}


function redo() {
  _graph.value.redo()
}

function undo() { 
  _graph.value.undo()
}
function transform() { 
  _graph.value.translate(80,240)
}
function min() {
  _graph.value.zoom(-0.5)
}
function max() {
  _graph.value.zoom(0.5)
}

function zoomTo() { 
  _graph.value.zoomTo(1)
}

function tocenter() { 
  _graph.value.centerContent()
}

function getZoom() { 
  alert('zoom:'+  _graph.value.zoom() )
}

function togglePanning() { 
  _graph.value.togglePanning() // 切换画布平移状态

}
function getPanning() { 
  alert('getPanning:' + _graph.value.isPannable() )// 画布是否可以平移
}


// addNode和addEdge
function addNodeAndEdge() {
  const rect = new Shape.Rect({
    id: "node98",
    x: 100,
    y: 200,
    width: 80,
    height: 40,
    label: "rect",
    attrs: {
      body: {
        stroke: 'blue',
        fill: 'red'
      },
      label: {
        text: 'rect',
        fill: '#333'
      }
    },
  });

  const circle = new Shape.Circle({
    id: "node99",
    x: 280,
    y: 200,
    width: 60,
    height: 60,
    label: "circle",
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label1',
      },
      {
        tagName: 'text',
        selector: 'label2',
      },
      {
        tagName: 'image',
        selector: 'image',
      }
    ],
    attrs: {
      body: {
        stroke: 'blue',
        strokeWidth: 1,
        fill: 'red'
      },
      image: {
        'xlink:href': 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
        width: 40,
        height: 40,
        x: 10,
        y: 10,
      },
      label1: {
        text: 'label1：Node',
        refX: 50,
        refY: 50,
        fontSize: 10,
        fill: '#000',
        'text-anchor': 'start',  // middle、end，决定文字的哪一端位于refX、refY偏移后的位置
      },
      label2: {
        text: 'label2：Welcome cufeuzi',
        refX: 50,
        refY: 70,
        fontSize: 10,
        fill: '#000',
        'text-anchor': 'start'
      }
    }
  });
  const edge = new Shape.Edge({
    source: rect,
    target: circle,
  });
    console.log('正在添加节点')

  _graph.value.addNode(rect)
  _graph.value.addNode(circle)
  _graph.value.addEdge(edge)
    console.log('正在添加节点')

}

// 自定义节点，演示markup属性
function addCustomNode() { 
  const customNode = new Node({
    x: 100,
    y: 100,
    width: 80,
    height: 40,
    // markup搭配attrs使用，markup会覆盖
    markup: [
      {
        tagName: 'rect',
        selector: 'body111',
      },
      {
        tagName: 'text',
        selector: 'label111',
      },
    ],
    attrs: {
      // 此处可以写rect/body111，text/label111
      body111: {
        stroke: '#000',
        fill: '#fff',
        ref: 'label111',  // 文本要在矩形里边
        rx: 3,
        ry: 3,
        refWidth: 100,
        refHeight: 100,
        refX: -50,
        refY: -50,
      },
      text: {
        fontSize: 14,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle'
      },
      label111: {
        text: '自定义node'
      }
    }
  })
  console.log('正在添加自定义节点')
  _graph.value.addNode(customNode)
  console.log('添加完成')
}

function addHTMLNode() { 
  console.log('正在添加HTML节点')
  // _graph.value.addNode(new Shape.HTML({
  //   shape: 'Cylinder',
  //   x: 100,
  //   y: 100,
  //   width: 140, // Number，可选，节点大小的 width 值
  //   height: 50, // Number，可选，节点大小的 height 值
  //   html: `
  //             <div class="custom_node_logic">
  //               <div>
  //                 <i>💠</i>
  //                 <p title="html节点">html节点</p>
  //               </div>
  //             </div>
  //           `,
  //   attrs: {
  //     body: {
  //       stroke: 'transparent',
  //       strokeWidth: 10,
  //       magnet: true,
  //     }
  //   },
  // }))

  _graph.value.addNode({
    shape: 'polyline',
    x: 320,
    y: 40,
    width: 80,
    height: 80,
    label: 'polyline',
    // 使用 points 属性指定顶点数组
    points: [
      [0, 0],
      [0, 10],
      [10, 10],
      [10, 0],
    ],
    attrs: {
      body: {
        fill: '#efdbff',
        stroke: '#9254de',
      },
    },
  })

  _graph.value.addNode({
    shape: 'polyline',
    x: 40,
    y: 180,
    width: 80,
    height: 80,
    label: 'polyline',
    // 使用 points 属性指定顶点数组
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 10 },
      { x: 10, y: 10 },
      { x: 10, y: 0 },
    ],
    attrs: {
      body: {
        fill: '#efdbff',
        stroke: '#9254de',
      },
    },
  })

  _graph.value.addNode({
    shape: 'polyline',
    x: 180,
    y: 210,
    width: 80,
    height: 80,
    label: 'polyline',
    attrs: {
      body: {
        fill: '#efdbff',
        stroke: '#9254de',
        // 直接指定 points 属性，多边形顶点不随随图形大小自动缩放
        points: '0,10 10,0 20,10 10,20',
      },
    },
  })

  _graph.value.addNode({
    shape: 'polyline',
    x: 320,
    y: 180,
    width: 80,
    height: 80,
    attrs: {
      body: {
        fill: 'none',
        stroke: '#ffa940',
        refPoints: '0,40 40,40 40,80 80,80 80,120 120,120 120,160',
      },
    },
  })
   _graph.value.addNode({
    shape: 'image',
    x: 320,
    y: 120,
    width: 94,
    height: 28,
    imageUrl:
      'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
  })
  _graph.value.addNode({
    x: 160,
    y: 120,
    width: 360,
    height: 120,
    shape: 'text-block',
    text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
    attrs: {
      body: {
        fill: '#efdbff',
        stroke: '#9254de',
        rx: 4,
        ry: 4,
      },
    },
  })
  // _graph.value.addNode({
  //   shape: 'cylinder',
  //   x: 320,
  //   y: 120,
  //   width: 80,
  //   height: 120,
  //   label: 'cylinder',
  //   attrs: {
  //     top: {
  //       fill: '#fe854f',
  //       fillOpacity: 0.5,
  //     },
  //     body: {
  //       fill: '#ED8A19',
  //       fillOpacity: 0.8,
  //     },
  //   },
  // }) // 这个在2.0 版本要自己注册
  console.log('添加完成')
}


// 拖动后松开鼠标触发事件
function handleDragEnd(e, item) {
  addHandleNode(e.pageX - 240, e.pageY - 40, new Date().getTime(), item.name, item.type)
}
// 生成节点函数
function addHandleNode(x, y, id, name, type) {
  let node = (type === 'initial' ? Tools.initInitialNode(x, y, id, name, type) : Tools.initLogicNode(x, y, id, name, type))
  console.log(node)
  _graph.value.addNode(node)
}


// 保存png
function saveToPNG() {
  nextTick(() => {

    _graph.value.exportPNG()

    // _graph.value.toPNG((dataUri : any) => {
    //   // 下载
    //   DataUri.downloadDataUri(dataUri, '拓扑图.png')
    // }, {
    //   backgroundColor: 'white',
    //   padding: {
    //     top: 50,
    //     right: 50,
    //     bottom: 50,
    //     left: 50
    //   },
    //   quality: 1,
    //   copyStyles: false
    // })
  })
}


function nodeAddEvent() {
  // _graph.value.on("node:contextmenu", ({ e, x, y, node, view }) => {
  //   console.log(console.log('右键', e, x, y, node, view))
  // });
  _graph.value.on("node:dblclick", ({ e, x, y, node, view }) => {
    console.log('dblclick', node)
    if (node.id === graphDatas.value.subParentId) { 
      _graph.value.fromJSON({
        nodes: graphDatas.value.subFlow,
          edges: graphDatas.value.subFlowEdges
        });
    }
    // node.addTools({
    //   name: "node-editor"
    // })
  });
  // _graph.value.on("edge:click", ({ e, x, y, edge, view }) => { });
  // _graph.value.on("blank:click", ({ e, x, y }) => { });

  // _graph.value.on("cell:mouseenter", ({ e, cell, view }) => { });
  // _graph.value.on("node:mouseenter", ({ e, node, view }) => { });
  // _graph.value.on("edge:mouseenter", ({ e, edge, view }) => { });
  // _graph.value.on("graph:mouseenter", ({ e }) => { });


  //  // 鼠标移入移出节点

  // _graph.value.on('node:mouseleave', () => {
  //   const container = document.getElementById('container') || []
  //   const ports = container.querySelectorAll(
  //     '.x6-port-body'
  //   )
  //   showPorts(ports, false)
  // })
  // _graph.value.on('blank:click', () => {
  //   this.type = 'grid'
  // })
  // _graph.value.on('cell:click', ({ cell }) => {
  //   this.type = cell.isNode() ? 'node' : 'edge'

  // 鼠标移入移出节点
  _graph.value.on('node:mouseenter', FunctionExt.debounce(() => {
    const container = document.getElementById('container')
    const ports = container.querySelectorAll(
      '.x6-port-body'
    )
    showPorts(ports, true)
  }),
    500
  )
  _graph.value.on('node:mouseleave', () => {
    const container = document.getElementById('container')
    const ports = container.querySelectorAll(
      '.x6-port-body'
    )
    showPorts(ports, false)
  })
  _graph.value.on('blank:click', () => {
    type.value = 'grid'
  })
  _graph.value.on('cell:click', ({ cell }) => {
    type.value = cell.isNode() ? 'node' : 'edge'
  })
  _graph.value.on('selection:changed', (args) => {
    args.added.forEach(cell => {
      selectCell.value = cell
      if (cell.isEdge()) {
        cell.isEdge() && cell.attr('line/strokeDasharray', 5) //虚线蚂蚁线
        cell.addTools([
          {
            name: 'vertices',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 0.1,
                stroke: '#2d8cf0',
                fill: '#ffffff',
              }
            },
          },
        ])
      }
    })
    args.removed.forEach(cell => {
      cell.isEdge() && cell.attr('line/strokeDasharray', 0)  //正常线
      cell.removeTools()
    })
  })



  _graph.value.on('history:change', () => {
      canRedo.value = _graph.value.canRedo()
      canUndo.value = _graph.value.canUndo()
  })
  // 节点绑定点击事件
  _graph.value.on('node:click', (target) => {
    const { e, x, y, node, view } = target
    console.log(target)
    // 判断是否有选中过节点
    if (curSelectNode.value) {
      // 移除选中状态
      curSelectNode.value.removeTools()
      // 判断两次选中节点是否相同
      if (curSelectNode.value !== node) {
        node.addTools([{
          name: 'boundary',
          args: {
            attrs: {
              fill: '#16B8AA',
              stroke: '#2F80EB',
              strokeWidth: 1,
              fillOpacity: 0.1
            }
          }
        }, {
          name: 'button-remove',
          args: {
            x: '100%',
            y: 0,
            offset: {
              x: 0,
              y: 0
            }
          }
        }])
        curSelectNode.value = node
      } else {
        curSelectNode.value = null
      }
    } else {
      curSelectNode.value = node
      node.addTools([{
        name: 'boundary',
        args: {
          attrs: {
            padding: '5',
            fill: '#16B8AA',
            stroke: '#2F80EB',
            strokeWidth: 1,
            fillOpacity: 0.1
          }
        }
      }
        , {
        name: 'button-remove',
        args: {
          x: '100%',
          y: 0,
          offset: {
            x: 0,
            y: 0
          }
        }
        }
      ])
    }
  })
  // 连线绑定悬浮事件
  _graph.value.on('cell:mouseenter', ({ cell }) => {
    if (cell.shape == 'edge') {
      cell.addTools([
        {
          name: 'button-remove',
          args: {
            x: '100%',
            y: 0,
            offset: {
              x: 0,
              y: 0
            },
          },
        }])
      cell.setAttrs({
        line: {
          stroke: '#409EFF',
        },
      })
      cell.zIndex = 99
    }
  })
  _graph.value.on('cell:mouseleave', ({ cell }) => {
    if (cell.shape === 'edge') {
      cell.removeTools()
      cell.setAttrs({
        line: {
          stroke: '#275da3',
        },
      })
      cell.zIndex = 1
    }
  })
}

function showPorts(ports, show) {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

function redraw() { 
  _graph.value.drawGrid({
    grid,
    type: 'dot',
  })
}
function hideGrid() { 
  _graph.value.hideGrid()
}


function changeEdgeType(e) { // 改变边形状
  if (e === 'normal') {
    this.connectEdgeType = {
      connector: 'normal',
      router: { name: '' }
    }
    this.currentArrow = 1
  } else if (e === 'smooth') {
    this.connectEdgeType = {
      connector: 'smooth',
      router: { name: '' }
    }
    this.currentArrow = 2
  } else {
    this.connectEdgeType = {
      connector: 'normal',
      router: { name: 'manhattan' }
    }
    this.currentArrow = 3
  }
}


function setNode(val) {
  const nodes = _graph.value.getNodes()
  console.log(nodes)

  const cell = _graph.value.getCellById(selectCell.value.id)
  cell.data = {'test': '1'}
  // selectCell.value.attr('label/text', val)
  // nodes.forEach((node) => {
  //   node.attr('label/text', val)
  // })
  curSelectNode.value.data = {
    test2: 'test2'
  }
}


function upper() {
  _graph.value.fromJSON(graphDatas.value);

}
</script>
 
<style scoped lang="scss">
.main {
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  background: #eaeaea;
  > div {
    background: #ffffff;
    border-radius: 5px;
  }
}
.left {
  width: 200px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
    > div {
        border: 2px dashed #eaeaea;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
      }
}
.container {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  // margin-right: 8p24
  // margin-left: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
  position: relative;
  .tools {
    position: absolute;
    z-index: 2;
    margin-top: -24px;
  }

  #container {
    // width: 100%;
    height: 100%;
    border: 2px dashed #eaeaea;
  }
}

.right {
  width: 300px;
  margin-left: 20px;

}

.stencil {
  position: relative;
  width: 200px;
  border: 1px solid #f0f0f0;
}
</style>