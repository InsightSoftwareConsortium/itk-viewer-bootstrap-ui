import React, { useState, useEffect } from 'react'
import { useSelector } from '@xstate/react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Image from 'react-bootstrap/Image'
import { scaleSelectIconDataUri } from '@itk-viewer/icons'
import { Form } from 'react-bootstrap'
import getSelectedImageContext from './getSelectedImageContext'

const selectScaleCount = (state) => {
  const { image, labelImage } = getSelectedImageContext(state)
  const loadedImage = image ?? labelImage
  return loadedImage.scaleInfo.length
}

const selectLoadedScale = (state) => {
  return getSelectedImageContext(state)?.loadedScale
}

function ScaleSelector({ service }) {
  const scaleCount = useSelector(service, selectScaleCount)
  const loadedScale = useSelector(service, selectLoadedScale)
  const [lastUserSelection, setLastUserSelection] = useState('Framerate-pick')

  const handleSelection = (event) => {
    const context = service.state.context
    const imageActor = context.images.imageRenderingActors.get(
      context.images.selectedName
    )
    if (event.target.value === 'Framerate-pick') {
      imageActor.send('ADJUST_SCALE_FOR_FRAMERATE')
    } else {
      imageActor.send('SET_IMAGE_SCALE', {
        targetScale: parseInt(event.target.value)
      })
    }
    setLastUserSelection(event.target.value)
  }

  useEffect(() => {
    const sub = service.subscribe(({ event: { type } }) => {
      if (
        type === 'RENDERED_IMAGE_ASSIGNED' ||
        type === 'IMAGE_HISTOGRAM_UPDATED'
      )
        setLastUserSelection(undefined)
    })
    return () => sub.unsubscribe()
  }, [service])

  // use lastUserSelection until image update event
  const selectedScale = lastUserSelection ?? loadedScale
  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Resolution Scale</Tooltip>}
    >
      <div
        className="blendSelector"
        style={{
          display: 'flex',
          alignSelf: 'center',
          marginRight: '5px'
        }}
      >
        <Image
          className="icon"
          src={scaleSelectIconDataUri}
          alt="Resolution Scale"
        />
        <Form.Control
          as="select"
          className="selector"
          onChange={(event) => {
            handleSelection(event)
          }}
          value={selectedScale}
          style={{ maxWidth: '10ch' }}
        >
          <option key={'Framerate-pick'} value="Framerate-pick">
            Framerate-pick
          </option>
          {[...Array(scaleCount).keys()].reverse().map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Form.Control>
      </div>
    </OverlayTrigger>
  )
}

export default ScaleSelector
