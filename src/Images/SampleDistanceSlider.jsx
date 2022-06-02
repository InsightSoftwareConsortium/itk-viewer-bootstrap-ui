import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { sampleDistanceIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

function SampleDistanceSlider(props) {
  const { service } = props
  const spacingDiv = useRef(null)
  const spacingElement = useRef(null)
  const state = useSelector(service, (state) => state)
  const send = service.send
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      state.context,
      'invertibleButton',
      spacingDiv.current
    )
    state.context.images.volumeSampleDistanceDiv = spacingDiv.current
    state.context.images.volumeSampleDistanceSlider = spacingElement.current
  }, [])

  const spacingChanged = (val) => {
    send({
      type: 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
      data: {
        name: state.context.images.selectedName,
        volumeSampleDistance: val
      }
    })
  }

  return (
    <div className="iconWithSlider">
      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>Volume sample distance</Tooltip>}
      >
        <Button
          className="icon-button-disabled"
          variant="primary"
          ref={spacingDiv}
          disabled
        >
          <Image src={sampleDistanceIconDataUri}></Image>
        </Button>
      </OverlayTrigger>
      <Form>
        <Form.Group>
          <Form.Control
            ref={spacingElement}
            type="range"
            custom
            className="slider"
            min={0}
            max={1}
            value={actorContext.volumeSampleDistance}
            step={0.01}
            onChange={(_e, val) => {
              spacingChanged(_e.target.value)
            }}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default SampleDistanceSlider
