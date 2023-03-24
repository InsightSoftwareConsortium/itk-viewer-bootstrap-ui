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
      style={{ paddingTop: '2px' }}
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
  const uiLayers = useSelector(
    service,
    (state) => state.context.layers.uiLayers
  )
  const layerEntry = useRef(null)

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

  const layerSelected = (selection) => {
    const visible = layerVisible(selection)
    return visible && selection
  }

  const icon = actor.type === 'image' ? imageIconDataUri : labelsIconDataUri

  return (
    <Col
      ref={layerEntry}
      className={`layerEntryCommon ${layerVisible(name)}`}
      xs={6}
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
      <div className="layerIconGroup">
        <Spinner name={name} service={service} />
        <Image src={icon} className="layerTypeIcon" />
      </div>
    </Col>
  )
}

export default LayerEntry
