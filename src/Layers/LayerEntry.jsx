import React, { useEffect, useRef } from 'react'
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
import '../style.css'
import { Button } from 'react-bootstrap'
import cn from 'classnames'

function Spinner({ name, service }) {
  const isDataUpdating = useSelector(
    service,
    (state) => state.context.layers.actorContext.get(name).isDataUpdating
  )
  return (
    <div
      className={cn('ldsRing', {
        'visibility-hidden': !isDataUpdating
      })}
      style={{ paddingTop: '6px', marginRight: '6px' }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

function LayerEntry(props) {
  const { service, name, actor } = props
  const send = service.send
  const actorContext = useSelector(
    service,
    (state) => state.context.layers.actorContext
  )
  const uiLayers = useSelector(
    service,
    (state) => state.context.layers.uiLayers
  )
  const layerEntry = useRef(null)
  const lastAddedData = useSelector(
    service,
    (state) => state.context.layers.lastAddedData
  )

  useEffect(() => {
    if (uiLayers) {
      uiLayers.set(name, layerEntry.current)
    }
  }, [uiLayers, name, layerEntry])

  const layerVisible = () => {
    if (actor.visible) {
      return 'selectedLayer'
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

  return (
    <Col
      ref={layerEntry}
      className={`layerEntryCommon ${layerVisible(name)}`}
      onClick={() => {
        layerSelected(name)
      }}
    >
      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>Data visibility</Tooltip>}
      >
        <Button
          onClick={() => {
            send({ type: 'TOGGLE_LAYER_VISIBILITY', data: name })
          }}
          variant="secondary"
          className={cn(`icon-button`, {
            checked: actor.visible
          })}
        >
          {layerVisible(name) ? (
            <Image src={visibleIconDataUri}></Image>
          ) : (
            <Image src={invisibleIconDataUri}></Image>
          )}
        </Button>
      </OverlayTrigger>
      <div className="layerLabelCommon"> {name} </div>
      <div className={`icon-image`}>
        <Spinner name={name} service={service} />
        {layerType(name) === 'image' ? (
          <Image src={imageIconDataUri} />
        ) : (
          layerType(name) === 'labelImage' && <Image src={labelsIconDataUri} />
        )}
      </div>
    </Col>
  )
}

export default LayerEntry
