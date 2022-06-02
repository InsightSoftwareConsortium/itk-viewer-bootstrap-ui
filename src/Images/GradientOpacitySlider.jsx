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

const GradientOpacitySlider = React.memo(function GradientOpacitySlider(props) {
  const { service } = props
  const state = useSelector(service, (state) => state)
  const send = service.send
  const sliderEntry = useRef(null)
  const gradientOpacitySlider = useRef(null)
  const gradientOpacityScaleSlider = useRef(null)
  const [vertSlider, setVertSlider] = useState(false)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      state.context,
      'invertibleButton',
      sliderEntry.current
    )
    state.context.images.gradientOpacitySlider = gradientOpacitySlider.current
    state.context.images.gradientOpacityScaleSlider =
      gradientOpacityScaleSlider.current
  }, [])

  const opacityScaleSliderChanged = (value) => {
    send({
      type: 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
      data: {
        name: state.context.images.selectedName,
        gradientOpacityScale: value
      }
    })
  }

  const opacitySliderChanged = (value) => {
    send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: {
        name: state.context.images.selectedName,
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
            checked: true
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
        <Form>
          <Form.Group>
            <Form.Control
              ref={gradientOpacitySlider}
              type="range"
              className={`slider gradientOpacityInput ${
                vertSlider ? '' : 'hidden'
              }`}
              min={0}
              max={1}
              value={actorContext.gradientOpacity}
              step={0.01}
              onChange={(_e, val) => {
                opacitySliderChanged(_e.target.value)
              }}
            />
          </Form.Group>
        </Form>
      </div>
      <Form className="gradientSliderContainer">
        <Form.Group>
          <Form.Control
            ref={gradientOpacityScaleSlider}
            type="range"
            custom
            className="slider"
            min={0}
            max={0.99}
            value={actorContext.gradientOpacityScale}
            step={0.01}
            onChange={(_e, val) => {
              opacityScaleSliderChanged(_e.target.value)
            }}
          />
        </Form.Group>
      </Form>
    </div>
  )
})

export default GradientOpacitySlider
