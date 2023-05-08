interface Edge { 
  source: string,
  target: string,
  label?: string,
}
export function flowNodeGenerator(source: Array<T>) {
  let nodeIds: Array<string> = []
  const nodes: Array<T> = [];
  const edges: Array<Edge> = [];
  const subFlow: Array<T> = []
  const subFlowEdges: Array<T> = []
  let subParentId: string = ''


  const subObj: { [id: string]: {nodes: [], edges: []} } = {} 

  nodeIds = source.map(i => i.id)
  

  source.forEach(i => {
    function getEdge(i: any): Array<T> {
      const target = []
      if (i?.outputs) {
        if (Array.isArray(i.outputs)) {
          i.outputs.forEach(edg => { 
            target.push({
              source: nodeIds[edg.target.replace('/0/@nodes.', '')],
              target: nodeIds[edg.source.replace('/0/@nodes.', '')],
              label: edg?.condition || '',
            })
          })
        } else { 
          target.push({
            source: nodeIds[i.outputs.target.replace('/0/@nodes.', '')],
            target: nodeIds[i.outputs.source.replace('/0/@nodes.', '')],
            label: i.outputs?.condition || '',
          })
        }
      }
      return target
    }
  
    const { x, y, id, name, nodeType, parentId, inputParams, outputParams, ...left } = i
    nodeIds.push(id)
    if (parentId) {
      // 旧
      subParentId = parentId

      const node = {
        x: Number(x), y:Number(y), id,
        label: name,
        // shape: '' || nodeType,
        shape: 'rect',
        width: 80,
        height: 40,
        data: {
          inputParams: JSON.parse(inputParams),
          outputParams: JSON.parse(outputParams),
        },
        backData: {...left}
      }
      subFlow.push(node)
      // getEdge(subFlowEdges, i)
      subFlowEdges.push(...getEdge(i))

      // 新
      if (subObj[parentId]) {
        subObj[parentId].nodes.push(node)
        subObj[parentId].edges.push(...getEdge(i))

      } else {
        subObj[parentId] = {
          nodes: [node],
          edges: [...getEdge(i)]
        }
      }




    } else { 
      nodes.push({
        x: Number(x), y:Number(y), id,
        label: name,
        // shape: '' || nodeType,
        shape: 'rect',
        width: 80,
        height: 40,
        data: {
          inputParams: JSON.parse(inputParams),
          outputParams: JSON.parse(outputParams),
        },
        backData: {...left}
      })
      // getEdge(edges, i)
      edges.push(...getEdge(i))
    }
  })


  // edges.forEach(j => { 
  //   j.source = nodeIds[Number(j.source)]
  //   j.target = nodeIds[Number(j.target)]
  // })

  // subFlowEdges.forEach(j => { 
  //   j.source = nodeIds[Number(j.source)]
  //   j.target = nodeIds[Number(j.target)]
  // })


  // Object.values(subObj).forEach(i => { 
  //   i.edges.forEach(j => { 
  //     j.source = nodeIds[Number(j.source)]
  //     j.target = nodeIds[Number(j.target)]
  //   })

  // })

  return {
    nodes,
    edges,
    subFlow,
    subFlowEdges,
    subParentId,
    subObj
  }
}


export const displayData = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 100,
      y: 200,
      width: 80,
      height: 40,
      label: '矩形'
    },
    {
      id: 'node2',
      shape: 'circle',
      x: 300,
      y: 200,
      width: 80,
      height: 40,
      label: '圆形'
    },
    {
      id: 'node3',
      shape: 'ellipse',
      x: 500,
      y: 200,
      width: 80,
      height: 40,
      label: '椭圆'
    },
    {
      id: 'node4',
      shape: 'polygon',
      x: 700,
      y: 200,
      width: 80,
      height: 40,
      label: '多边形',
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
    },
    {
      id: 'node5',
      shape: 'polyline',
      x: 900,
      y: 200,
      width: 80,
      height: 40,
      label: '折线',
      attrs: {
        body: {
          fill: '#efdbff',
          stroke: '#9254de',
          // 点之间只连两两，最后一个和第一个不连
          refPoints: '0,0 0,10 10,10 10,0'
        }
      }
    },
    {
      id: 'node6',
      shape: 'path',
      x: 1100,
      y: 200,
      width: 80,
      height: 40,
      label: '路径',
      // svg格式的path格式
      // path: 'M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z',
      path: 'm468.21502,252.08332l-72.97137,0l-22.52531,-66.80479l-3.16285,9.33589l-19.38904,57.4817l-72.95144,-0.01281l59.01764,41.32638l-22.56518,66.84961l59.03093,-41.32638l59.04422,41.34559l-22.57182,-66.86882l59.04422,-41.32638zm-87.69588,56.4892l-7.80745,-5.46195l-7.80745,5.46835l-25.92736,18.14672l9.90051,-29.35236l2.99009,-8.84925l-7.82073,-5.47475l-25.91407,-18.14672l41.69508,0l2.99009,-8.84285l9.89386,-29.35236l9.89386,29.33315l2.98344,8.84285l41.73495,0l-25.95394,18.15953l-7.82738,5.46835l2.98344,8.86206l9.92044,29.35236l-25.92736,-18.15313z',
      attrs: {
        body: {
          fill: '#efdbff',
          stroke: '#9254de',
        }
      }
    },
    {
      id: 'node7',
      shape: 'image',
      x: 1300,
      y: 200,
      width: 80,
      height: 40,
      imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg'
    },
    // {
    //   id: 'node8',
    //   shape: "image-bordered",
    //   x: 1300,
    //   y: 400,
    //   width: 80,
    //   height: 40,
    //   imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg'
    // },
    // {
    //   id: 'node9',
    //   shape: 'image-embedded',
    //   x: 1100,
    //   y: 400,
    //   width: 80,
    //   height: 40,
    //   imageUrl: 'https://img2-bs.511doc.com/mark/00/00/37/42/32e7b926810f3bd87e6e46a3226a3bdf.jpg%21/quality/90/unsharp/true/compress/true/fw/640/clip/640x500a0a500'
    // },
    // {
    //   id: 'node10',
    //   shape: 'image-inscribed',
    //   x: 900,
    //   y: 400,
    //   width: 80,
    //   height: 40,
    //   imageUrl: 'https://img2-bs.511doc.com/mark/00/00/37/42/32e7b926810f3bd87e6e46a3226a3bdf.jpg%21/quality/90/unsharp/true/compress/true/fw/640/clip/640x500a0a500'
    // },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      shape: 'edge',
      source: 'node3',
      target: 'node4',
    },
    {
      shape: 'edge',
      source: 'node4',
      target: 'node5',
    },
    {
      shape: 'edge',
      source: 'node5',
      target: 'node6',
    },
    {
      shape: 'edge',
      source: 'node6',
      target: 'node7',
    },
    // {
    //   shape: 'edge',
    //   source: 'node7',
    //   target: 'node11',
    // },
  ]
}