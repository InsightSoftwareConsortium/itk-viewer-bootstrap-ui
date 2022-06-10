import React, { useEffect, useState } from 'react'
import { useSelector } from '@xstate/react'
import LayerEntry from './LayerEntry'
import Col from 'react-bootstrap/Col'

function LayerInterface(props) {
  const { service } = props
  const lastAddedData = useSelector(
    service,
    (state) => state.context.layers.lastAddedData
  )
  const [allLayers, updateLayers] = useState([])

  useEffect(() => {
    if (lastAddedData) {
      updateLayers([...allLayers, lastAddedData])
    }
  }, [lastAddedData])

  return (
    <Col className="layerUIGroupPadding">
      <LayerEntry {...props} />
    </Col>
  )
}

export default LayerInterface
