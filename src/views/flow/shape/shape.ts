import type { PortManager } from '@antv/x6/lib/model/port'

const attrs = {
  circle: {
    r: 6,
    magnet: true,
    stroke: '#31d0c6',
    strokeWidth: 2,
    fill: '#fff',
    style: {
      visibility: 'hidden'
    }
  }
}

export const createPorts = (positions = 'top,left,right,bottom') => {
  const ports: Partial<PortManager.Metadata> = {
    groups: {},
    items: []
  }
  positions.split(',').forEach(position => {
    ports.groups![position] = {
      attrs,
      position
    }
    ports.items!.push({ group: position })
  })
  return ports
}
