import { useActor, useSelector } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
import LayerInterface from './LayerInterface'

function LayersInterface(props) {
  const { service } = props
  const layersUIGroup = useRef(null)
  const uiGroups = useSelector(service, (state) => state.context.uiGroups)
  const layers = useSelector(service, (state) => state.context.layers)

  useEffect(() => {
    layers.uiLayers = new Map()
    layers.layersUIGroup = layersUIGroup.current
    uiGroups.set('layers', layersUIGroup.current)
  }, [])

  return (
    <div className="layersUIGroup" ref={layersUIGroup}>
      <LayerInterface className="layersUIRow" {...props} />
    </div>
  )
}

export default LayersInterface
