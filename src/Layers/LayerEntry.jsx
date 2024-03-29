import React, { Fragment, useEffect, useRef } from 'react'
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
  toggleIconDataUri,
  boundingBoxIconDataUri,
  downloadIconDataUri
} from '@itk-viewer/icons'
import '../style.css'
import { Button, Dropdown } from 'react-bootstrap'
import cn from 'classnames'
import { arraysEqual } from '../utils'

const BOUNDING_BOX_TEXT = 'Bounding Box'

const downloadExtensions = [
  'hdf5',
  'nrrd',
  'nii',
  'nii.gz',
  'tif',
  'mha',
  'vtk',
  'iwi.cbor'
]

function DownloadMenu({ name, service }) {
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  if (selectedName !== name) {
    return null
  }
  const download = (format) =>
    service.send({
      type: 'DOWNLOAD_IMAGE',
      data: {
        name,
        layerName: name,
        format
      }
    })

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>{'Save Image'}</Tooltip>}
    >
      <Dropdown>
        <Dropdown.Toggle className={'icon-button'} variant="light">
          <Image src={downloadIconDataUri}></Image>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {downloadExtensions.map((ext) => (
            <Dropdown.Item
              key={ext}
              onClick={() => {
                download(ext)
              }}
            >
              {`Download as ${ext}`}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </OverlayTrigger>
  )
}

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
      style={{ paddingTop: '8px' }}
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

  const compareWith = (fixedImageName, method) =>
    service.send({
      type: 'COMPARE_IMAGES',
      data: {
        name,
        fixedImageName,
        options: { method }
      }
    })

  const stopComparing = () => {
    service.send({
      type: 'COMPARE_IMAGES',
      data: {
        name,
        options: { method: 'disabled' }
      }
    })
  }

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

  if (alt === 'settings') {
    return (
      <Dropdown>
        <Dropdown.Toggle className={'icon-button'} variant="light">
          <Image src={icon}></Image>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {otherImages.map((fixedImageName) => (
            <Fragment key={fixedImageName}>
              <Dropdown.Item
                onClick={() => {
                  compareWith(fixedImageName, 'green-magenta')
                }}
              >
                {`Green-Magenta compare with ${fixedImageName}`}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  compareWith(fixedImageName, 'cyan-red')
                }}
              >
                {`Cyan-Red compare with ${fixedImageName}`}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  compareWith(fixedImageName, 'cyan-magenta')
                }}
              >
                {`Cyan-Magenta compare with ${fixedImageName}`}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  compareWith(fixedImageName, 'blend')
                }}
              >
                {`Blend compare with ${fixedImageName}`}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  compareWith(fixedImageName, 'checkerboard')
                }}
              >
                {`Checkerboard compare with ${fixedImageName}`}
              </Dropdown.Item>
            </Fragment>
          ))}

          <Dropdown.Item onClick={stopComparing} key={'stop'}>
            {`Stop comparing`}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return <Image src={icon} alt={alt} className="layerTypeIcon" />
}

function LayerEntry({ service, name, actor }) {
  const send = service.send
  const uiLayers = useSelector(
    service,
    (state) => state.context.layers.uiLayers
  )
  const actorContext = useSelector(service, (state) =>
    state.context.layers.actorContext.get(name)
  )
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
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
      xs={12}
      onClick={() => {
        layerSelected(name)
      }}
    >
      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>{'Toggle Visibility'}</Tooltip>}
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
      <OverlayTrigger transition={false} overlay={<Tooltip>{name}</Tooltip>}>
        <div className="layerLabelCommon"> {name} </div>
      </OverlayTrigger>
      <div className="layerIconGroup">
        <Spinner name={name} service={service} style={{ paddingTop: '4px' }} />
        <DownloadMenu name={name} service={service} />
        <OverlayTrigger
          transition={false}
          overlay={<Tooltip>{BOUNDING_BOX_TEXT}</Tooltip>}
        >
          <Button
            onClick={() => {
              send({
                type: 'TOGGLE_LAYER_BBOX',
                data: {
                  name: selectedName,
                  layerName: name
                }
              })
            }}
            variant="secondary"
            className={cn(`icon-button`, {
              checked: actorContext.bbox
            })}
          >
            <Image src={boundingBoxIconDataUri}></Image>
          </Button>
        </OverlayTrigger>
        <LayerIcon name={name} actor={actor} service={service}></LayerIcon>
      </div>
    </Col>
  )
}

export default LayerEntry
