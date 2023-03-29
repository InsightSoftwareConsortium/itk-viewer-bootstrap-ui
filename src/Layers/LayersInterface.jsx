import { useSelector } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { arraysEqual } from '../utils'
import LayerEntry from './LayerEntry'

function LayersInterface(props) {
  const { service } = props
  const layersUIGroup = useRef(null)

  useEffect(() => {
    service.machine.context.layers.uiLayers = new Map()
    service.machine.context.layers.layersUIGroup = layersUIGroup.current
  }, [layersUIGroup, service.machine.context.layers])

  const layers = useSelector(
    service,
    (state) => [...state.context.layers.actorContext.entries()],
    (a, b) =>
      arraysEqual(
        a?.map(([key]) => key),
        b?.map(([key]) => key)
      )
  )

  return (
    <Col className="layersUIGroup">
      <Row ref={layersUIGroup}>
        {layers.map(([name, actor], idx) => (
          <LayerEntry
            name={name}
            actor={actor}
            service={service}
            key={name}
            // fill row if last layer and odd number of layers
            fillRow={idx === layers.length - 1 && layers.length % 2 === 1}
          ></LayerEntry>
        ))}
      </Row>
    </Col>
  )
}

export default LayersInterface
