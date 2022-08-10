import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import { gradientIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'
import '../style.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function GradientOpacitySlider(props) {
  const { service } = props
  const stateContext = useSelector(service, (state) => state.context)
  const send = service.send
  const sliderEntry = useRef(null)
  const gradientOpacitySlider = useRef(null)
  const gradientOpacityScaleSlider = useRef(null)
  const [vertSlider, setVertSlider] = useState(false)

  const gradientOpacityScale = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        ?.gradientOpacityScale
  )

  const gradientOpacity = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        ?.gradientOpacity
  )

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      sliderEntry.current
    )
    stateContext.images.gradientOpacitySlider = gradientOpacitySlider.current
    stateContext.images.gradientOpacityScaleSlider =
      gradientOpacityScaleSlider.current
  }, [])

  const opacityScaleSliderChanged = (value) => {
    send({
      type: 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
      data: {
        name: stateContext.images.selectedName,
        gradientOpacityScale: value
      }
    })
  }

  const opacitySliderChanged = (value) => {
    send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: {
        name: stateContext.images.selectedName,
        gradientOpacity: value
      }
    })
  }

  return (
    <div className="iconWithSlider">
      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>Gradient opacity scale</Tooltip>}
      >
        <Button
          className={cn('icon-button', {
            checked: vertSlider
          })}
          onClick={() => {
            setVertSlider(!vertSlider)
          }}
          variant="secondary"
          ref={sliderEntry}
        >
          <Image src={gradientIconDataUri}></Image>
        </Button>
      </OverlayTrigger>
      <div className="gradientOpacityScale">
        <Form.Control
          ref={gradientOpacitySlider}
          type="range"
          className={`slider gradientOpacityInput ${
            vertSlider ? '' : 'hidden'
          }`}
          min={0}
          max={1}
          value={gradientOpacity}
          step={0.01}
          onChange={(_e) => {
            opacitySliderChanged(_e.target.value)
          }}
        />
      </div>
      <Form className="gradientSliderContainer">
        <Form.Control
          ref={gradientOpacityScaleSlider}
          type="range"
          custom
          className="slider"
          min={0}
          max={0.99}
          value={gradientOpacityScale}
          step={0.01}
          onChange={(_e) => {
            opacityScaleSliderChanged(_e.target.value)
          }}
        />
      </Form>
    </div>
  )
}

export default GradientOpacitySlider
