import { useActor } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
import LayerInterface from './LayerInterface'

function LayersInterface(props) {
  const { service } = props
  const layersUIGroup = useRef(null)
  const [state] = useActor(service)

  useEffect(() => {
    state.context.layers.uiLayers = new Map()
    state.context.layers.layersUIGroup = layersUIGroup.current
    state.context.uiGroups.set('layers', layersUIGroup.current)
  }, [])

  return (
    <div className="layersUIGroup" ref={layersUIGroup}>
      <LayerInterface className="layersUIRow" {...props} />
    </div>
  )
}

export default LayersInterface
