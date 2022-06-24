import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {
  visibleIconDataUri,
  invisibleIconDataUri,
  imageIconDataUri,
  labelsIconDataUri
} from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'
import { Button } from 'react-bootstrap'
import cn from 'classnames'

function LayerEntry(props) {
  const { service } = props
  const send = service.send
  const stateContext = useSelector(service, (state) => state.context)
  const uiLayers = useSelector(
    service,
    (state) => state.context.layers.uiLayers
  )
  const layerEntry = useRef(null)
  const lastAddedData = useSelector(
    service,
    (state) => state.context.layers.lastAddedData
  )
  const actorContext = stateContext.layers.actorContext
  const [allLayers, updateLayers] = useState([])

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'layerEntry',
      layerEntry.current
    )
  }, [])

  useEffect(() => {
    if (uiLayers && lastAddedData) {
      service.machine.context.layers.uiLayers.set(
        lastAddedData.name,
        layerEntry.current
      )
    }
  })

  useEffect(() => {
    if (lastAddedData) {
      updateLayers([...allLayers, lastAddedData])
    }
  }, [lastAddedData])

  const layerVisible = (name) => {
    if (actorContext && lastAddedData) {
      if (actorContext.get(name).visible) {
        return 'selectedLayer'
      }
    }
    return ''
  }

  const layerType = (name) => {
    if (actorContext && lastAddedData) {
      return actorContext.get(name).type
    }
    return ''
  }

  const layerSelected = (selection) => {
    const visible = layerVisible(selection)
    return visible && selection
  }

  const useColumnSize = (idx) => {
    if (idx % 2 === 0 && idx + 1 === allLayers.length) {
      return 12
    }
    return 6
  }

  return actorContext && allLayers.length ? (
    allLayers.map((layer, idx) => {
      return (
        <Col
          key={idx}
          xs={useColumnSize(idx)}
          ref={layerEntry}
          className={`layerEntryCommon ${layerVisible(layer.name)}`}
          onClick={() => {
            layerSelected(layer.name)
          }}
        >
          <OverlayTrigger
            transition={false}
            overlay={<Tooltip>Data visibility</Tooltip>}
          >
            <Button
              onClick={() => {
                send({ type: 'TOGGLE_LAYER_VISIBILITY', data: layer.name })
              }}
              variant="secondary"
              className={cn(`icon-button`, {
                checked: layerVisible(layer.name)
              })}
            >
              {layerVisible(layer.name) ? (
                <Image src={visibleIconDataUri}></Image>
              ) : (
                <Image src={invisibleIconDataUri}></Image>
              )}
            </Button>
          </OverlayTrigger>
          <div className="layerLabelCommon"> {layer.name} </div>
          <div className={`icon-image`}>
            {layerType(layer.name) === 'image' ? (
              <Image src={imageIconDataUri} />
            ) : (
              layerType(layer.name) === 'labelImage' && (
                <Image src={labelsIconDataUri} />
              )
            )}
          </div>
        </Col>
      )
    })
  ) : (
    <div />
  )
}

export default LayerEntry
