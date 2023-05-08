<template>
  <a-row :gutter="[8, 8]">
    <!--  gutter表示水平（col和col之间）和垂直（row和row之间）间隔，span表示每个col在水平方向所占大小（总共24）  -->
    <a-col :span="5">
      <div id="stencil"></div>
    </a-col>
    <a-col :span="14">
      <div id="container"></div>
    </a-col>
    <a-col :span="5">
      <a-form :model="formData">
        <a-form-item label="标题" v-show="formData.id !== null">
          <a-select v-model:value="formData.id" placeholder="请选择数据" @change="onIdChange">
            <a-select-option v-for="item in dropdownData.tableData" :key="item.id" :value="item.id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="内容" v-show="formData.content !== null">
          <a-input v-model:value="formData.content" @change="onContentChange" />
        </a-form-item>

        <a-button @click="toJson">toJson</a-button>
      </a-form>
    </a-col>
  </a-row>
</template>
 
<script>
import { Graph, Shape } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { onMounted, reactive } from "vue";

const tableData = [
  {
    id: 1,
    title: '标题1',
    content: '内容1',
  },
  {
    id: 2,
    title: '标题2',
    content: '内容2',
  },
  {
    id: 3,
    title: '标题3',
    content: '内容3',
  }
]

export default {
  name: "cellDemo4",
  setup () {
    let graph = null;
    let stencil = null;
    let curCel = null;

    // 构建当前画布
    function buildGraph () {
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
    }

    // 构建左侧菜单栏
    function buildStencil () {
      stencil = new Stencil({
        target: graph,
        stencilGraphWidth: 290,
        // 是否可折叠
        collapsable: true,
        groups: [
          {
            name: 'basic',
            title: '基础节点',
            graphHeight: 180,
          },
          {
            name: 'combination',
            title: '组合节点',
            layoutOptions: {
              columns: 1,
              marginX: 80,
            },
            graphHeight: 260,
          }
        ]
      })
      document.querySelector('#stencil').appendChild(stencil.container)
    }

    // 左侧菜单栏节点
    function stencilLoadNode () {
      const bizNode1 = new Shape.Rect({
        width: 100,
        height: 50,
        attrs: {
          label: {
            fontSize: 12,
            text: '业务节点1',
          }
        }
      })
      const bizNode2 = new Shape.Rect({
        width: 100,
        height: 50,
        attrs: {
          label: {
            fontSize: 12,
            text: '业务节点2',
          }
        }
      })
      const bizNode3 = new Shape.Rect({
        width: 100,
        height: 50,
        attrs: {
          label: {
            fontSize: 12,
            text: '业务节点3',
          }
        }
      })
      const bizNode4 = new Shape.Rect({
        width: 120,
        height: 50,
        attrs: {
          label: {
            fontSize: 12,
            text: '组合业务节点1',
          }
        }
      })
      stencil.load([bizNode1, bizNode2, bizNode3], 'basic')
      stencil.load([bizNode4], 'combination')
    }

    // 表单数据定义
    let formData = reactive({
      id: null,
      title: null,
      content: null,
    })

    // 节点点击事件
    function initEvent () {
      graph.on('cell:click', ({ cell }) => {
        console.log(cell.getAttrs())
        if (curCel != null)
          curCel.attr('body/stroke', null)
        curCel = cell
        curCel.attr('body/stroke', 'red')
        formData.id = cell.getData() ? cell.getData().id : undefined

        if (formData.id) {
          setTimeout(() => {
            const tableDataRow = tableData.filter(item => item.id === formData.id)[0]
            formData.title = tableDataRow.title
            formData.content = tableDataRow.content
          }, 100)
        } else {
          formData.title = null
          formData.content = null
        }
      })
    }

    // 定义下拉数据
    const dropdownData = reactive({
      tableData: [],
    })

    onMounted(() => {
      buildGraph();
      buildStencil();
      stencilLoadNode();
      initEvent();
      setTimeout(() => {
        dropdownData.tableData = tableData;
      }, 1000);
    })

    function onIdChange () {
      setTimeout(() => {
        const tableDataRow = tableData.filter(item => item.id === formData.id)[0]
        formData.title = tableDataRow.title
        formData.content = tableDataRow.content

        curCel.setData({
          id: formData.id,
          content: formData.content
        })
        curCel.attr('label/text', formData.title)
      }, 100)
    }

    function onContentChange () {
      curCel.data.content = formData.content
    }

    function toJson () {
      console.log(graph.toJSON())
    }

    return {
      formData,
      dropdownData,
      onIdChange,
      onContentChange,
      toJson,
    }
  }
}
</script>
 
<style scoped></style>