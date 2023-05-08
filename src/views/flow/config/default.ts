// 网格设置
export const grid = {
  size: 20,      // 网格大小 10px
  visible: true, // 渲染网格背景
  type: 'mesh', // 类型
  args: {
    color: '#D0D0D0',
    thickness: 2, // 网格线宽度/网格点大小
    factor: 10, // 主次网格线间隔
  },
}


// 连线方式
export const connectEdgeType = {  
  connector: 'rounded',
  shape: 'edge', // 'custom-edge-label',
  router: {
    name: ''
  }
}