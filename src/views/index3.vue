<template>
  <a-button @click="addRect">addRect</a-button>
  <a-button @click="rectReConfig">rectReConfig</a-button>
  <a-button @click="toJson">toJson</a-button>
  <div id="container"></div>
</template>
 
<script>
import { defineComponent, onMounted } from "vue";
import { Graph, Shape, Node, ObjectExt } from "@antv/x6";

export default defineComponent({
  name: "cellDemo5",
  setup () {
    let graph;
    onMounted(() => {
      graph = new Graph({
        container: document.getElementById('container'),
        height: 600,
        background: {
          color: '#fffbe6',
        },
        grid: {
          size: 10,
          visible: true,
        }
      })
    })
    function addRect () {
      const rect = new Shape.Rect({
        x: 10,
        y: 40,
        width: 200,
        height: 100,
        attrs: {
          label: {
            text: 'attrs/label'
          }
        }
      })
      graph.addNode(rect)
    }
    function rectReConfig () {
      Shape.Rect.config({
        // 如果一开始设置了，此处设置不作数
        // 如果一开始没设置（addRect中），则使用此处设置的
        // 最终实际效果为，如果addRect有的，以addRect为主，没有的以config为主（深度融合）
        width: 80,
        height: 40,
        attrs: {
          label: {
            fill: 'red'
          }
        },
        data: {
          tableId: 1
        },
        // 钩子函数打印两次，第一次打印config中的设置，第二次打印addRect中的设置
        // 如果使用ObjectExt，则最终效果包含钩子中内容（覆盖之前）
        propHooks (metadata) {
          console.log(metadata)
          const { data, ...others } = metadata
          if (data) {
            ObjectExt.setByPath(others, 'data/tableId', 2)
          }
          return others
        }
      })
    }
    function toJson () {
      console.log(graph.toJSON())
    }
    return {
      addRect,
      rectReConfig,
      toJson
    }
  }
})
</script>
 
<style scoped></style>