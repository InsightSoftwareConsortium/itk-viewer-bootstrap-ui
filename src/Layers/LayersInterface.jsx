import React, { useEffect, useRef } from 'react'
import LayerInterface from './LayerInterface'

function LayersInterface(props) {
  const { service } = props
  const layersUIGroup = useRef(null)

  useEffect(() => {
    service.machine.context.layers.uiLayers = new Map()
    service.machine.context.layers.layersUIGroup = layersUIGroup.current
  }, [])

  return (
    <div className="layersUIGroup" ref={layersUIGroup}>
      <LayerInterface className="layersUIRow" {...props} />
    </div>
  )
}

export default LayersInterface
