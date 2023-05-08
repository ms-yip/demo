import type { Graph } from '@antv/x6'

export function registerKeyboardEvent(graph: Graph) {
  // #region 复制 剪切 粘贴
  graph.bindKey(_createCtrlKey('c'), () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })

  graph.bindKey(_createCtrlKey('x'), () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })

  graph.bindKey(_createCtrlKey('v'), () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  // #endregion

  // #region 撤销 重做
  graph.bindKey(_createCtrlKey('z'), () => {
    if (graph.history.canUndo()) {
      graph.history.undo()
    }
    return false
  })
  graph.bindKey(_createCtrlKey('z', true), () => {
    if (graph.history.canRedo()) {
      graph.history.redo()
    }
    return false
  })
  // #endregion

  // 删除
  graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })
}

export function registerNodeEvent(graph: Graph) {
  // graph.on("node:contextmenu", ({ e, x, y, node, view }) => {
  //   console.log(console.log('右键', e, x, y, node, view))
  // });
  // graph.on("node:dblclick", ({ e, x, y, node, view }) => {
  //   console.log('dblclick', node)
  //   if (node.id === graphDatas.value.subParentId) { 
  //     graph.fromJSON({
  //       nodes: graphDatas.value.subFlow,
  //         edges: graphDatas.value.subFlowEdges
  //       });
  //   }
  //   // node.addTools({
  //   //   name: "node-editor"
  //   // })
  // });
  // graph.on("edge:click", ({ e, x, y, edge, view }) => { });
  // graph.on("blank:click", ({ e, x, y }) => { });

  // graph.on("cell:mouseenter", ({ e, cell, view }) => { });
  // graph.on("node:mouseenter", ({ e, node, view }) => { });
  // graph.on("edge:mouseenter", ({ e, edge, view }) => { });
  // graph.on("graph:mouseenter", ({ e }) => { });


  //  // 鼠标移入移出节点

  // graph.on('node:mouseleave', () => {
  //   const container = document.getElementById('container') || []
  //   const ports = container.querySelectorAll(
  //     '.x6-port-body'
  //   )
  //   showPorts(ports, false)
  // })
  // graph.on('blank:click', () => {
  //   this.type = 'grid'
  // })
  // graph.on('cell:click', ({ cell }) => {
  //   this.type = cell.isNode() ? 'node' : 'edge'

  // 鼠标移入移出节点
  // graph.on('node:mouseenter', FunctionExt.debounce(() => {
  //   const container = document.getElementById('container')
  //   const ports = container.querySelectorAll(
  //     '.x6-port-body'
  //   )
  //   showPorts(ports, true)
  // }),
  //   500
  // )
  // graph.on('node:mouseleave', () => {
  //   const container = document.getElementById('container')
  //   const ports = container.querySelectorAll(
  //     '.x6-port-body'
  //   )
  //   showPorts(ports, false)
  // })
  // graph.on('blank:click', () => {
  //   type.value = 'grid'
  // })
  // graph.on('cell:click', ({ cell }) => {
  //   type.value = cell.isNode() ? 'node' : 'edge'
  // })
  // graph.on('selection:changed', (args) => {
  //   args.added.forEach(cell => {
  //     selectCell.value = cell
  //     if (cell.isEdge()) {
  //       cell.isEdge() && cell.attr('line/strokeDasharray', 5) //虚线蚂蚁线
  //       cell.addTools([
  //         {
  //           name: 'vertices',
  //           args: {
  //             padding: 4,
  //             attrs: {
  //               strokeWidth: 0.1,
  //               stroke: '#2d8cf0',
  //               fill: '#ffffff',
  //             }
  //           },
  //         },
  //       ])
  //     }
  //   })
  //   args.removed.forEach(cell => {
  //     cell.isEdge() && cell.attr('line/strokeDasharray', 0)  //正常线
  //     cell.removeTools()
  //   })
  // })



  // graph.on('history:change', () => {
  //     canRedo.value = graph.canRedo()
  //     canUndo.value = graph.canUndo()
  // })
  // 节点绑定点击事件
  // graph.on('node:click', (target) => {
  //   const { e, x, y, node, view } = target
  //   console.log(target)
  //   // 判断是否有选中过节点
  //   if (curSelectNode.value) {
  //     // 移除选中状态
  //     curSelectNode.value.removeTools()
  //     // 判断两次选中节点是否相同
  //     if (curSelectNode.value !== node) {
  //       node.addTools([{
  //         name: 'boundary',
  //         args: {
  //           attrs: {
  //             fill: '#16B8AA',
  //             stroke: '#2F80EB',
  //             strokeWidth: 1,
  //             fillOpacity: 0.1
  //           }
  //         }
  //       }, {
  //         name: 'button-remove',
  //         args: {
  //           x: '100%',
  //           y: 0,
  //           offset: {
  //             x: 0,
  //             y: 0
  //           }
  //         }
  //       }])
  //       curSelectNode.value = node
  //     } else {
  //       curSelectNode.value = null
  //     }
  //   } else {
  //     curSelectNode.value = node
  //     node.addTools([{
  //       name: 'boundary',
  //       args: {
  //         attrs: {
  //           padding: '5',
  //           fill: '#16B8AA',
  //           stroke: '#2F80EB',
  //           strokeWidth: 1,
  //           fillOpacity: 0.1
  //         }
  //       }
  //     }
  //       , {
  //       name: 'button-remove',
  //       args: {
  //         x: '100%',
  //         y: 0,
  //         offset: {
  //           x: 0,
  //           y: 0
  //         }
  //       }
  //       }
  //     ])
  //   }
  // })
  // 连线绑定悬浮事件
  graph.on('cell:mouseenter', ({ cell }) => {
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
  graph.on('cell:mouseleave', ({ cell }) => {
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