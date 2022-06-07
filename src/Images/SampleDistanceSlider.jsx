import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { sampleDistanceIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

function SampleDistanceSlider(props) {
  const { service } = props
  const spacingDiv = useRef(null)
  const spacingElement = useRef(null)
  const stateContext = useSelector(service, (state) => state.context)
  const send = service.send
  const name = stateContext.images.selectedName
  const actorContext = stateContext.images.actorContext.get(name)
  const volumeSampleDistance = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .volumeSampleDistance
  )

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      spacingDiv.current
    )
    stateContext.images.volumeSampleDistanceDiv = spacingDiv.current
    stateContext.images.volumeSampleDistanceSlider = spacingElement.current
  }, [])

  const spacingChanged = (val) => {
    send({
      type: 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
      data: {
        name: stateContext.images.selectedName,
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
        <div className="icon-image" ref={spacingDiv}>
          <Image src={sampleDistanceIconDataUri}></Image>
        </div>
      </OverlayTrigger>
      <Form.Control
        ref={spacingElement}
        type="range"
        custom
        className="slider"
        min={0}
        max={1}
        value={volumeSampleDistance}
        step={0.01}
        onChange={(e) => {
          spacingChanged(e.target.value)
        }}
      />
    </div>
  )
}

export default SampleDistanceSlider
