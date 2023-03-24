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
  labelsIconDataUri,
  toggleIconDataUri
} from 'itk-viewer-icons'
import '../style.css'
import { Button } from 'react-bootstrap'
import cn from 'classnames'
import { arraysEqual } from '../utils'

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

function LayerIcon({ name, actor, service }) {
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )

  const otherImages = useSelector(
    service,
    (state) =>
      [...state.context.layers.actorContext.keys()].filter(
        (key) =>
          key !== name &&
          state.context.images.actorContext.get(name)?.labelImage?.name !== key
      ),
    arraysEqual
  )

  const getIcon = () => {
    if (actor.type === 'image') {
      if (name === selectedName && otherImages && otherImages.length > 0)
        return { icon: toggleIconDataUri, alt: 'settings' }
      return { icon: imageIconDataUri, alt: 'image' }
    }
    if (actor.type === 'labelImage')
      return { icon: labelsIconDataUri, alt: 'labels' }
    throw new Error(`Unsupported layer type: ${actor.type}`)
  }

  const { icon, alt } = getIcon()
  return <Image src={icon} alt={alt} className="layerTypeIcon" />
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
        <LayerIcon name={name} actor={actor} service={service}></LayerIcon>
      </div>
    </Col>
  )
}

export default LayerEntry
