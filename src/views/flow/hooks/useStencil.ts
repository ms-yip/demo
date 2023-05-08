import type { Graph } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { createPorts } from '@/views/flow/shape/shape';

export function useStencil(graph: Graph , stencilContainer: HTMLElement| null) {
  const stencil = new Stencil({
    title: '组件库',
    target: graph, // 绑定流程面板
    stencilGraphWidth: 200, // 节点库宽度
    stencilGraphHeight: 150, // 节点库高度
    layoutOptions: {
      columns: 2, // 每行节点数
      rowhHeight: 40 // 行高
    },
    search(cell, keyword) {
      return cell.shape.indexOf(keyword) !== -1
    },
    placeholder: 'Search by shape name/请输入',
    notFoundText: 'Not Found/没有数据',
    collapsable: true,
    groups: [
      { name: '基础组件'},
      {
        name: "group1",
      },
      {
        name: "group2",
      },
    ],
  })
  const commonAttrs = {
    body: {
      fill: '#fff',
      stroke: '#9254de',
      strokeWidth: 1,
    },
  }

 const n1 = graph.createNode({
    shape: 'rect',
    x: 40,
    y: 40,
    width: 80,
    height: 40,
    label: 'rect',
   attrs: commonAttrs,
    ports: createPorts()
  })

  const n2 = graph.createNode({
    shape: 'circle',
    x: 180,
    y: 40,
    width: 40,
    height: 40,
    label: 'circle',
    attrs: commonAttrs,
    ports: createPorts()

  })


  // const temp = Object.assign(commonAttrs,{
  //    // 填充色
  //   fill: '#efdbff',
  //   // 边框色
  //   stroke: '#9254de',
  //   // 设置了4组，四边形，代表四个点的偏移，与width、height、x、y一起看
  //   // 点之间都连接
  //   refPoints: '0,10 10,0 20,10 10,20',
  // })
  // console.log(commonAttrs,temp, Object.assign(commonAttrs,{
  //    // 填充色
  //   fill: '#efdbff',
  //   // 边框色
  //   stroke: '#9254de',
  //   // 设置了4组，四边形，代表四个点的偏移，与width、height、x、y一起看
  //   // 点之间都连接
  //   refPoints: '0,10 10,0 20,10 10,20',
  // }))
  const n3 = graph.createNode({
    shape: 'ellipse',
    x: 280,
    y: 40,
    width: 80,
    height: 40,
    label: 'ellipse',
    attrs: commonAttrs,
    ports: createPorts()
  })
  const n4 = graph.createNode({
    shape: 'path',
    x: 420,
    y: 40,
    width: 40,
    height: 40,
    // https://www.svgrepo.com/svg/13653/like
    path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
    attrs: commonAttrs,
    label: 'path',
    ports: createPorts()
  })
  const start = graph.createNode({
    shape: 'circle',
    x: 180,
    y: 40,
    width: 40,
    height: 40,
    label: '开始',
    attrs: commonAttrs,
    ports: createPorts()
  })
  const end = graph.createNode({
    shape: 'circle',
    x: 180,
    y: 40,
    width: 40,
    height: 40,
    label: '结束',
    attrs: commonAttrs,
    ports: createPorts()
  })
  const cusComponent = graph.createNode({
      shape: 'image',
      x: 190,
      y: 40,
      width: 80,
      height: 40,
      label: '自定义组件',
    imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      attrs: {
      body: {
        // 填充色
        fill: '#efdbff',
        // 边框色
        stroke: '#9254de',
        // 设置了4组，四边形，代表四个点的偏移，与width、height、x、y一起看
        // 点之间都连接
        refPoints: '0,10 10,0 20,10 10,20',
      }
    }
  })

  stencil.load([n1, n2], 'group1')
  stencil.load([n3, n4], 'group2')
  stencil.load([start, end, cusComponent], '基础组件')
  stencilContainer && stencilContainer.appendChild(stencil.container)

}

export default {
  useStencil
}
